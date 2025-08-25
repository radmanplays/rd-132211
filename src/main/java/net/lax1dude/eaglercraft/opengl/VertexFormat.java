package net.lax1dude.eaglercraft.opengl;

import static net.lax1dude.eaglercraft.opengl.RealOpenGLEnums.*;

/**
 * Copyright (c) 2022-2023 lax1dude. All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */
public enum VertexFormat {
	POSITION_TEX(true, false, false, false, false),
	POSITION_TEX_COLOR(true, true, false, false, false),
	MODIFIABLE(false, false, false, false, true);

	public static final int COMPONENT_POSITION_SIZE = 3;
	public static final int COMPONENT_POSITION_FORMAT = GL_FLOAT;
	public static final int COMPONENT_POSITION_STRIDE = 12;

	public static final int COMPONENT_TEX_SIZE = 2;
	public static final int COMPONENT_TEX_FORMAT = GL_FLOAT;
	public static final int COMPONENT_TEX_STRIDE = 8;

	public static final int COMPONENT_COLOR_SIZE = 4;
	public static final int COMPONENT_COLOR_FORMAT = GL_UNSIGNED_BYTE;
	public static final int COMPONENT_COLOR_STRIDE = 4;

	public static final int COMPONENT_NORMAL_SIZE = 4;
	public static final int COMPONENT_NORMAL_FORMAT = GL_BYTE;
	public static final int COMPONENT_NORMAL_STRIDE = 4;

	public static final int COMPONENT_LIGHTMAP_SIZE = 2;
	public static final int COMPONENT_LIGHTMAP_FORMAT = GL_UNSIGNED_SHORT;
	public static final int COMPONENT_LIGHTMAP_STRIDE = 4;

	public boolean attribPositionEnabled;
	public int attribPositionIndex;
	public int attribPositionOffset;
	public int attribPositionFormat;
	public boolean attribPositionNormalized;
	public int attribPositionSize;
	public int attribPositionStride;

	public boolean attribTextureEnabled;
	public int attribTextureIndex;
	public int attribTextureOffset;
	public int attribTextureFormat;
	public boolean attribTextureNormalized;
	public int attribTextureSize;
	public int attribTextureStride;

	public boolean attribColorEnabled;
	public int attribColorIndex;
	public int attribColorOffset;
	public int attribColorFormat;
	public boolean attribColorNormalized;
	public int attribColorSize;
	public int attribColorStride;

	public boolean attribNormalEnabled;
	public int attribNormalIndex;
	public int attribNormalOffset;
	public int attribNormalFormat;
	public boolean attribNormalNormalized;
	public int attribNormalSize;
	public int attribNormalStride;

//	public boolean attribLightmapEnabled;
//	public int attribLightmapIndex;
//	public int attribLightmapOffset;
//	public int attribLightmapFormat;
//	public boolean attribLightmapNormalized;
//	public int attribLightmapSize;
//	public int attribLightmapStride;

	public int attribCount;
	public int attribStride;

	public int eaglercraftAttribBits;

	private boolean init = false;
	// private boolean compact = false;
	// public final boolean supportsCompact;
	private boolean modifiable = false;
	private boolean hasUpdated = false;

	private VertexFormat(boolean texture, boolean color, boolean normal, boolean lightmap, boolean modifiable) {
		if (this.init) {
			throw new IllegalStateException();
		}
		this.init = true;
		this.attribTextureEnabled = texture;
		this.attribColorEnabled = color;
		this.attribNormalEnabled = normal;
		// this.attribLightmapEnabled = lightmap;
		this.modifiable = modifiable;
		// this.supportsCompact = !modifiable;
		updateVertexFormat(/* this.needsUpdate() */);
	}

	public void updateVertexFormat(/* boolean compact */) {
		if(this.modifiable && hasUpdated) {
			this.attribTextureEnabled = this.texture;
			this.attribColorEnabled = this.color;
			this.attribNormalEnabled = this.normal;
		}
		this.hasUpdated = true;
		
		int index = 0;
		int bytes = 0;
		int bitfield = 0;

		// this.compact = compact;
		this.attribPositionEnabled = true;
		this.attribPositionIndex = index++;
		this.attribPositionOffset = bytes;
		this.attribPositionFormat = /* !compact ? */ COMPONENT_POSITION_FORMAT /* : COMPONENT_POSITION_COMPACT_FORMAT */;
		this.attribPositionNormalized = false;
		this.attribPositionSize = /* !compact ? */ COMPONENT_POSITION_SIZE /* : COMPONENT_POSITION_COMPACT_SIZE */;
		this.attribPositionStride = /* !compact ? */ COMPONENT_POSITION_STRIDE /* : COMPONENT_POSITION_COMPACT_STRIDE */;
		bytes += this.attribPositionStride;

		if (this.attribColorEnabled) {
			this.attribColorIndex = index++;
			this.attribColorOffset = bytes;
			this.attribColorFormat = COMPONENT_COLOR_FORMAT;
			this.attribColorNormalized = true;
			this.attribColorSize = COMPONENT_COLOR_SIZE;
			this.attribColorStride = COMPONENT_COLOR_STRIDE;
			bytes += this.attribColorStride;
			bitfield |= EaglercraftGPU.ATTRIB_COLOR;
		} else {
			this.attribColorIndex = -1;
			this.attribColorOffset = -1;
			this.attribColorFormat = -1;
			this.attribColorNormalized = false;
			this.attribColorSize = -1;
			this.attribColorStride = -1;
		}

		if (this.attribTextureEnabled) {
			this.attribTextureIndex = index++;
			this.attribTextureOffset = bytes;
			this.attribTextureFormat = /* !compact ? */ COMPONENT_TEX_FORMAT /* : COMPONENT_TEX_COMPACT_FORMAT */;
			this.attribTextureNormalized = false;
			this.attribTextureSize = /* !compact ? */ COMPONENT_TEX_SIZE /* : COMPONENT_TEX_COMPACT_SIZE */;
			this.attribTextureStride = /* !compact ? */ COMPONENT_TEX_STRIDE /* : COMPONENT_TEX_COMPACT_SIZE */;
			bytes += this.attribTextureStride;
			bitfield |= EaglercraftGPU.ATTRIB_TEXTURE;
		} else {
			this.attribTextureIndex = -1;
			this.attribTextureOffset = -1;
			this.attribTextureFormat = -1;
			this.attribTextureNormalized = false;
			this.attribTextureSize = -1;
			this.attribTextureStride = -1;
		}

		if (this.attribNormalEnabled) {
			this.attribNormalIndex = index++;
			this.attribNormalOffset = bytes;
			this.attribNormalFormat = COMPONENT_NORMAL_FORMAT;
			this.attribNormalNormalized = true;
			this.attribNormalSize = COMPONENT_NORMAL_SIZE;
			this.attribNormalStride = COMPONENT_NORMAL_STRIDE;
			bytes += this.attribNormalStride;
			bitfield |= EaglercraftGPU.ATTRIB_NORMAL;
		} else {
			this.attribNormalIndex = -1;
			this.attribNormalOffset = -1;
			this.attribNormalFormat = -1;
			this.attribNormalNormalized = false;
			this.attribNormalSize = -1;
			this.attribNormalStride = -1;
		}

//		if (this.attribLightmapEnabled) {
//			this.attribLightmapIndex = index++;
//			this.attribLightmapOffset = bytes;
//			this.attribLightmapFormat = COMPONENT_LIGHTMAP_FORMAT;
//			this.attribLightmapNormalized = false;
//			this.attribLightmapSize = COMPONENT_LIGHTMAP_SIZE;
//			this.attribLightmapStride = COMPONENT_LIGHTMAP_STRIDE;
//			bytes += this.attribLightmapStride;
//			bitfield |= EaglercraftGPU.ATTRIB_LIGHTMAP;
//		} else {
//			this.attribLightmapIndex = -1;
//			this.attribLightmapOffset = -1;
//			this.attribLightmapFormat = -1;
//			this.attribLightmapNormalized = false;
//			this.attribLightmapSize = -1;
//			this.attribLightmapStride = -1;
//		}

		this.attribCount = index;
		this.attribStride = bytes;
		this.eaglercraftAttribBits = bitfield;
		// setCache(bitfield);
	}

	private boolean texture = false;
	private boolean color = false;
	private boolean normal = false;
	// private boolean lightmap = false;

	public void setTex() {
		if (!modifiable) {
			throw new IllegalStateException("Tried to modify a read-only vertex format...");
		}
		this.texture = true;
	}

	public void setColor() {
		if (!modifiable) {
			throw new IllegalStateException("Tried to modify a read-only vertex format...");
		}
		this.color = true;
	}

	public void setNormal() {
		if (!modifiable) {
			throw new IllegalStateException("Tried to modify a read-only vertex format...");
		}
		this.normal = true;
	}

//	public void setLightmap(boolean lm) {
//		if (!modifiable) {
//			throw new IllegalStateException("Tried to modify a read-only vertex format...");
//		}
//		this.lightmap = lm;
//	}
	
	public void reset() {
		this.texture = false;
		this.color = false;
		this.normal = false;
		//this.setLightmap(false);
	}
	
	public boolean needsUpdate() {
		if(this.modifiable) {
			if(this.attribColorEnabled != this.color || this.attribTextureEnabled != this.texture || this.attribNormalEnabled != this.normal /*|| this.attribLightmapEnabled != this.lightmap*/) {
				return true;
			}
		}
		return false;
		//return (Minecraft.getMinecraft().gameSettings.sUseCompactVertexFormat != this.compact) && this.supportsCompact;
	}

}
