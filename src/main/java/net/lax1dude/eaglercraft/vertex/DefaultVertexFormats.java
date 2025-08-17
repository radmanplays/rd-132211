package net.lax1dude.eaglercraft.vertex;

import net.lax1dude.eaglercraft.opengl.VertexFormat;

/**+
 * This portion of EaglercraftX contains deobfuscated Minecraft 1.8 source code.
 * 
 * Minecraft 1.8.8 bytecode is (c) 2015 Mojang AB. "Do not distribute!"
 * Mod Coder Pack v9.18 deobfuscation configs are (c) Copyright by the MCP Team
 * 
 * EaglercraftX 1.8 patch files (c) 2022-2025 lax1dude, ayunami2000. All Rights Reserved.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 * 
 */
public class DefaultVertexFormats {
	public static final VertexFormat BLOCK = VertexFormat.createVertexFormat(true, true, false, true);
	public static final VertexFormat ITEM = VertexFormat.createVertexFormat(true, true, true, false);
	public static final VertexFormat OLDMODEL_POSITION_TEX_NORMAL = VertexFormat.createVertexFormat(true, false, true, false);
	public static final VertexFormat PARTICLE_POSITION_TEX_COLOR_LMAP = VertexFormat.createVertexFormat(true, true, true, true);
	public static final VertexFormat POSITION = VertexFormat.createVertexFormat(false, false, false, false);
	public static final VertexFormat POSITION_COLOR = VertexFormat.createVertexFormat(false, true, false, false);
	public static final VertexFormat POSITION_TEX = VertexFormat.createVertexFormat(true, false, false, false);
	public static final VertexFormat POSITION_NORMAL = VertexFormat.createVertexFormat(false, false, true, false);
	public static final VertexFormat POSITION_TEX_COLOR = VertexFormat.createVertexFormat(true, true, false, false);
	public static final VertexFormat POSITION_TEX_NORMAL = VertexFormat.createVertexFormat(true, false, true, false);
	public static final VertexFormat POSITION_TEX_LMAP_COLOR = VertexFormat.createVertexFormat(true, true, false, true);
	public static final VertexFormat POSITION_TEX_COLOR_NORMAL = VertexFormat.createVertexFormat(true, true, true, false);

}