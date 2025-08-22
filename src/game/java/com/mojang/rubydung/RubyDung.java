package com.mojang.rubydung;

import com.mojang.rubydung.level.Chunk;
import com.mojang.rubydung.level.Level;
import com.mojang.rubydung.level.LevelRenderer;

import com.mojang.util.GLAllocation;
import net.lax1dude.eaglercraft.EagRuntime;

import java.io.IOException;
import org.lwjgl.LWJGLException;
import org.lwjgl.input.Keyboard;
import org.lwjgl.input.Mouse;
import org.lwjgl.opengl.Display;
import org.lwjgl.opengl.GL11;
import org.lwjgl.util.glu.GLU;

import net.lax1dude.eaglercraft.internal.EnumPlatformType;
import net.lax1dude.eaglercraft.internal.buffer.FloatBuffer;
import net.lax1dude.eaglercraft.internal.buffer.IntBuffer;

public class RubyDung implements Runnable {
	private static final boolean FULLSCREEN_MODE = false;
	private int width;
	private int height;
	private int lastWidth;
	private int lastHeight;
	private FloatBuffer fogColor = GLAllocation.createFloatBuffer(4);
	private Timer timer = new Timer(60.0F);
	private Level level;
	private LevelRenderer levelRenderer;
	private Player player;
	private IntBuffer viewportBuffer = GLAllocation.createIntBuffer(16);
	private IntBuffer selectBuffer = GLAllocation.createIntBuffer(2000);
	private HitResult hitResult = null;

	public void init() throws LWJGLException, IOException {
		int col = 920330;
		float fr = 0.5F;
		float fg = 0.8F;
		float fb = 1.0F;
		this.fogColor.put(new float[]{(float)(col >> 16 & 255) / 255.0F, (float)(col >> 8 & 255) / 255.0F, (float)(col & 255) / 255.0F, 1.0F}).flip();
		Display.create();
		Keyboard.create();
		Mouse.create();
		this.width = Display.getWidth();
		this.height = Display.getHeight();
		GL11.glEnable(GL11.GL_TEXTURE_2D);
		GL11.glShadeModel(GL11.GL_SMOOTH);
		GL11.glClearColor(fr, fg, fb, 0.0F);
		GL11.glClearDepth(1.0D);
		GL11.glEnable(GL11.GL_DEPTH_TEST);
		GL11.glDepthFunc(GL11.GL_LEQUAL);
		setupProjection(this.width, this.height);
		this.level = new Level(256, 256, 64);
		this.levelRenderer = new LevelRenderer(this.level);
		this.player = new Player(this.level);
		Mouse.setGrabbed(true);
	}
	
    private void setupProjection(int width, int height) {
        GL11.glMatrixMode(GL11.GL_PROJECTION);
        GL11.glLoadIdentity();
        GLU.gluPerspective(70.0F, (float) width / height, 0.05F, 1000.0F);
        GL11.glMatrixMode(GL11.GL_MODELVIEW);
    }

	public void destroy() {
		this.level.save();
		EagRuntime.destroy();
	}

	public void run() {
		try {
			this.init();
		} catch (Exception var9) {
			System.out.println("Failed to start RubyDung");
			throw new RuntimeException(var9);
		}

		long lastTime = System.currentTimeMillis();
		int frames = 0;

		try {
			while(!Display.isCloseRequested() && (EagRuntime.getPlatformType() != EnumPlatformType.DESKTOP || !Keyboard.isKeyDown(Keyboard.KEY_ESCAPE))) {
				this.timer.advanceTime();

				for(int e = 0; e < this.timer.ticks; ++e) {
					this.tick();
				}

				this.render(this.timer.a);
				++frames;

				while(System.currentTimeMillis() >= lastTime + 1000L) {
					System.out.println(frames + " fps, " + Chunk.updates);
					Chunk.updates = 0;
					lastTime += 1000L;
					frames = 0;
				}
			}
		} catch (Exception var10) {
			var10.printStackTrace();
		} finally {
			this.destroy();
		}

	}
	
	private int saveCountdown = 600;

	private void levelSave() {
	    if (level == null) return;

	    saveCountdown--;
	    if (saveCountdown <= 0) {
	        level.save();
	        saveCountdown = 600;
	    }
	}


	public void tick() {
		this.player.tick();
		levelSave();
	}

	private void moveCameraToPlayer(float a) {
		GL11.glTranslatef(0.0F, 0.0F, -0.3F);
		GL11.glRotatef(this.player.xRot, 1.0F, 0.0F, 0.0F);
		GL11.glRotatef(this.player.yRot, 0.0F, 1.0F, 0.0F);
		float x = this.player.xo + (this.player.x - this.player.xo) * a;
		float y = this.player.yo + (this.player.y - this.player.yo) * a;
		float z = this.player.zo + (this.player.z - this.player.zo) * a;
		GL11.glTranslatef(-x, -y, -z);
	}

	private void setupCamera(float a) {
        this.width = Display.getWidth();
        this.height = Display.getHeight();

	    if (width != lastWidth || height != lastHeight) {
	        lastWidth = width;
	        lastHeight = height;
            GL11.glViewport(0, 0, this.width, this.height);
            setupProjection(this.width, this.height);
        }
		GL11.glLoadIdentity();
		this.moveCameraToPlayer(a);
	}

	private void pick(float a) {
	    double px = player.x;
	    double py = player.y;
	    double pz = player.z;

	    float yaw = (float) Math.toRadians(player.yRot);
	    float pitch = (float) Math.toRadians(player.xRot);

	    double dx = Math.sin(yaw) * Math.cos(pitch);
	    double dy = -Math.sin(pitch);
	    double dz = -Math.cos(yaw) * Math.cos(pitch);

	    double reach = 3.0;
	    double step = 0.05;

	    HitResult closestHit = null;

	    double closestT = reach + 1;

	    for (int x = (int) Math.floor(px - reach); x <= (int) Math.floor(px + reach); x++) {
	        for (int y = (int) Math.floor(py - (reach + 1)); y <= (int) Math.floor(py + (reach + 1)); y++) {
	            for (int z = (int) Math.floor(pz - reach); z <= (int) Math.floor(pz + reach); z++) {
	                int block = level.getTile(x, y, z);
	                if (block != 0) {

	                    double txmin = (x - px) / dx;
	                    double txmax = (x + 1 - px) / dx;
	                    if (txmin > txmax) { double temp = txmin; txmin = txmax; txmax = temp; }

	                    double tymin = (y - py) / dy;
	                    double tymax = (y + 1 - py) / dy;
	                    if (tymin > tymax) { double temp = tymin; tymin = tymax; tymax = temp; }

	                    double tzmin = (z - pz) / dz;
	                    double tzmax = (z + 1 - pz) / dz;
	                    if (tzmin > tzmax) { double temp = tzmin; tzmin = tzmax; tzmax = temp; }

	                    double tEnter = Math.max(Math.max(txmin, tymin), tzmin);
	                    double tExit = Math.min(Math.min(txmax, tymax), tzmax);

	                    if (tEnter <= tExit && tEnter < closestT && tEnter >= 0 && tEnter <= reach + 1) {
	                        closestT = tEnter;

	                        int face;
	                        if (tEnter == txmin) {
	                            face = dx > 0 ? 4 : 5;
	                        } else if (tEnter == tymin) {
	                            face = dy > 0 ? 0 : 1;
	                        } else {
	                            face = dz > 0 ? 2 : 3;
	                        }

	                        closestHit = new HitResult(x, y, z, block, face);
	                    }
	                }
	            }
	        }
	    }

	    this.hitResult = closestHit;
	}

	public void render(float a) {
		float xo = (float)Mouse.getDX();
		float yo = (float)Mouse.getDY();
		this.player.turn(xo, yo);
		this.pick(a);

		while(Mouse.next()) {
			if (Mouse.getEventButtonState()) {
				Mouse.setGrabbed(true);
			}

			if(Mouse.getEventButton() == 1 && Mouse.getEventButtonState() && this.hitResult != null) {
				this.level.setTile(this.hitResult.x, this.hitResult.y, this.hitResult.z, 0);
			}

			if(Mouse.getEventButton() == 0 && Mouse.getEventButtonState() && this.hitResult != null) {
				int x = this.hitResult.x;
				int y = this.hitResult.y;
				int z = this.hitResult.z;
				if(this.hitResult.f == 0) {
					--y;
				}

				if(this.hitResult.f == 1) {
					++y;
				}

				if(this.hitResult.f == 2) {
					--z;
				}

				if(this.hitResult.f == 3) {
					++z;
				}

				if(this.hitResult.f == 4) {
					--x;
				}

				if(this.hitResult.f == 5) {
					++x;
				}

				this.level.setTile(x, y, z, 1);
			}
		}

		while(Keyboard.next()) {
			Mouse.setGrabbed(true);
			if(Keyboard.getEventKey() == Keyboard.KEY_RETURN && Keyboard.getEventKeyState()) {
				this.level.save();
			}
			if(Keyboard.getEventKey() == Keyboard.KEY_BACK && Keyboard.getEventKeyState()) {
				this.level.reset();
				this.player.resetPos();
			}
		}

		if (Display.wasResized()) {
			this.width = Display.getWidth();
			this.height = Display.getHeight();
			GL11.glViewport(0, 0, this.width, this.height);
		}

		GL11.glClear(GL11.GL_DEPTH_BUFFER_BIT | GL11.GL_COLOR_BUFFER_BIT);
		this.setupCamera(a);
		GL11.glEnable(GL11.GL_CULL_FACE);
		GL11.glEnable(GL11.GL_FOG);
		GL11.glFogi(GL11.GL_FOG_MODE, GL11.GL_EXP);
		GL11.glFogf(GL11.GL_FOG_DENSITY, 0.2F);
		GL11.glFog(GL11.GL_FOG_COLOR, this.fogColor);
		GL11.glDisable(GL11.GL_FOG);
		this.levelRenderer.render(this.player, 0);
		GL11.glEnable(GL11.GL_FOG);
		this.levelRenderer.render(this.player, 1);
		GL11.glDisable(GL11.GL_TEXTURE_2D);
		if(this.hitResult != null) {
			this.levelRenderer.renderHit(this.hitResult);
		}

		GL11.glDisable(GL11.GL_FOG);
		Display.update();
	}

	public static void checkError() {
		int e = GL11.glGetError();
		if(e != 0) {
			throw new IllegalStateException(GLU.gluErrorString(e));
		}
	}
}
