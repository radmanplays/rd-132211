package net.lax1dude.eaglercraft.opengl;

import net.lax1dude.eaglercraft.internal.buffer.ByteBuffer;

/**
 * Copyright (c) 2022 lax1dude. All Rights Reserved.
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
public class WorldVertexBufferUploader {
	public static void func_181679_a(WorldRenderer parWorldRenderer) {
		int cunt = parWorldRenderer.getVertexCount();
		if (cunt > 0) {
			VertexFormat fmt = parWorldRenderer.getVertexFormat();
			ByteBuffer buf = parWorldRenderer.getByteBuffer();
			buf.position(0).limit(cunt * fmt.attribStride);
			EaglercraftGPU.renderBuffer(buf, fmt.eaglercraftAttribBits, parWorldRenderer.getDrawMode(), cunt);
			parWorldRenderer.reset();
		}
	}

	public static void uploadDisplayList(int displayList, WorldRenderer worldRenderer) {
		int cunt = worldRenderer.getVertexCount();
		if (cunt > 0) {
			VertexFormat fmt = worldRenderer.getVertexFormat();
			ByteBuffer buf = worldRenderer.getByteBuffer();
			buf.position(0).limit(cunt * fmt.attribStride);
			EaglercraftGPU.uploadListDirect(displayList, buf, fmt.eaglercraftAttribBits, worldRenderer.getDrawMode(),
					cunt);
			worldRenderer.reset();
		} else {
			EaglercraftGPU.flushDisplayList(displayList, false);
		}
	}
}