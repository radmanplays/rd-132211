package com.mojang.rubydung.level;

import com.mojang.rubydung.phys.AABB;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import net.lax1dude.eaglercraft.internal.vfs2.VFile2;
import java.util.ArrayList;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

public class Level {
	public final int width;
	public final int height;
	public final int depth;
	private byte[] blocks;
	private int[] lightDepths;
	private ArrayList<LevelListener> levelListeners = new ArrayList();

	public Level(int w, int h, int d) {
		this.width = w;
		this.height = h;
		this.depth = d;
		this.blocks = new byte[w * h * d];
		this.lightDepths = new int[w * h];

		for(int x = 0; x < w; ++x) {
			for(int y = 0; y < d; ++y) {
				for(int z = 0; z < h; ++z) {
					int i = (y * this.height + z) * this.width + x;
					this.blocks[i] = (byte)(y <= d * 2 / 3 ? 1 : 0);
				}
			}
		}

		this.calcLightDepths(0, 0, w, h);
		this.load();
	}

	public void load() {
		try {
			VFile2 file = new VFile2("level.dat");
			if (!file.exists()) {
				return;
			}
			DataInputStream e = new DataInputStream(new GZIPInputStream(file.getInputStream()));
			e.readFully(this.blocks);
			this.calcLightDepths(0, 0, this.width, this.height);

			for(int i = 0; i < this.levelListeners.size(); ++i) {
				((LevelListener)this.levelListeners.get(i)).allChanged();
			}

			e.close();
		} catch (Exception var3) {
			var3.printStackTrace();
		}

	}

	public void save() {
		try {
			VFile2 file = new VFile2("level.dat");
			DataOutputStream e = new DataOutputStream(new GZIPOutputStream(file.getOutputStream()));
			e.write(this.blocks);
			e.close();
		} catch (Exception var2) {
			var2.printStackTrace();
		}

	}

	public void reset() {
		try {
			VFile2 file = new VFile2("level.dat");
			if (file.exists()) {
				file.delete();
			}
			java.util.Arrays.fill(this.blocks, (byte)0);
			for(int x = 0; x < this.width; ++x) {
				for(int y = 0; y < this.depth; ++y) {
					for(int z = 0; z < this.height; ++z) {
						int i = (y * this.height + z) * this.width + x;
						this.blocks[i] = (byte)(y <= this.depth * 2 / 3 ? 1 : 0);
					}
				}
			}
			this.calcLightDepths(0, 0, this.width, this.height);
			for (int i = 0; i < this.levelListeners.size(); ++i) {
				((LevelListener)this.levelListeners.get(i)).allChanged();
			}
		} catch (Exception var2) {
			var2.printStackTrace();
		}

	}

	public void calcLightDepths(int x0, int y0, int x1, int y1) {
		for(int x = x0; x < x0 + x1; ++x) {
			for(int z = y0; z < y0 + y1; ++z) {
				int oldDepth = this.lightDepths[x + z * this.width];

				int y;
				for(y = this.depth - 1; y > 0 && !this.isLightBlocker(x, y, z); --y) {
				}

				this.lightDepths[x + z * this.width] = y;
				if(oldDepth != y) {
					int yl0 = oldDepth < y ? oldDepth : y;
					int yl1 = oldDepth > y ? oldDepth : y;

					for(int i = 0; i < this.levelListeners.size(); ++i) {
						((LevelListener)this.levelListeners.get(i)).lightColumnChanged(x, z, yl0, yl1);
					}
				}
			}
		}

	}

	public void addListener(LevelListener levelListener) {
		this.levelListeners.add(levelListener);
	}

	public void removeListener(LevelListener levelListener) {
		this.levelListeners.remove(levelListener);
	}

	public boolean isTile(int x, int y, int z) {
		return x >= 0 && y >= 0 && z >= 0 && x < this.width && y < this.depth && z < this.height ? this.blocks[(y * this.height + z) * this.width + x] == 1 : false;
	}

	public boolean isSolidTile(int x, int y, int z) {
		return this.isTile(x, y, z);
	}

	public boolean isLightBlocker(int x, int y, int z) {
		return this.isSolidTile(x, y, z);
	}
	
	public int getTile(int x, int y, int z) {
	    if(x >= 0 && y >= 0 && z >= 0 && x < this.width && y < this.depth && z < this.height) {
	        return this.blocks[(y * this.height + z) * this.width + x] & 0xFF;
	    }
	    return 0;
	}


	public ArrayList<AABB> getCubes(AABB aABB) {
		ArrayList aABBs = new ArrayList();
		int x0 = (int)aABB.x0;
		int x1 = (int)(aABB.x1 + 1.0F);
		int y0 = (int)aABB.y0;
		int y1 = (int)(aABB.y1 + 1.0F);
		int z0 = (int)aABB.z0;
		int z1 = (int)(aABB.z1 + 1.0F);
		if(x0 < 0) {
			x0 = 0;
		}

		if(y0 < 0) {
			y0 = 0;
		}

		if(z0 < 0) {
			z0 = 0;
		}

		if(x1 > this.width) {
			x1 = this.width;
		}

		if(y1 > this.depth) {
			y1 = this.depth;
		}

		if(z1 > this.height) {
			z1 = this.height;
		}

		for(int x = x0; x < x1; ++x) {
			for(int y = y0; y < y1; ++y) {
				for(int z = z0; z < z1; ++z) {
					if(this.isSolidTile(x, y, z)) {
						aABBs.add(new AABB((float)x, (float)y, (float)z, (float)(x + 1), (float)(y + 1), (float)(z + 1)));
					}
				}
			}
		}

		return aABBs;
	}

	public float getBrightness(int x, int y, int z) {
		float dark = 0.8F;
		float light = 1.0F;
		return x >= 0 && y >= 0 && z >= 0 && x < this.width && y < this.depth && z < this.height ? (y < this.lightDepths[x + z * this.width] ? dark : light) : light;
	}

	public void setTile(int x, int y, int z, int type) {
		if(x >= 0 && y >= 0 && z >= 0 && x < this.width && y < this.depth && z < this.height) {
			this.blocks[(y * this.height + z) * this.width + x] = (byte)type;
			this.calcLightDepths(x, z, 1, 1);

			for(int i = 0; i < this.levelListeners.size(); ++i) {
				((LevelListener)this.levelListeners.get(i)).tileChanged(x, y, z);
			}

		}
	}
}
