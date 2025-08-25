package net.lax1dude.eaglercraft.internal;

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
class OpenGLObjects {

	static class BufferGL implements IBufferGL {

		final int ptr;

		BufferGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteBuffers(this);
		}

	}

	static class VertexArrayGL implements IVertexArrayGL {

		final int ptr;
		int enabled;

		VertexArrayGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteVertexArrays(this);
		}
		
		@Override
		public int getBits() {
			return enabled;
		}

		@Override
		public void setBit(int bit) {
			enabled |= bit;
		}

		@Override
		public void unsetBit(int bit) {
			enabled &= ~bit;
		}

	}

	static class TextureGL implements ITextureGL {

		final int ptr;
		int width;
		int height;
		
		boolean nearest = false;
		boolean anisotropic = false;

		TextureGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteTextures(this);
		}

		@Override
		public void setCacheSize(int w, int h) {
			width = w;
			height = h;
		}

		@Override
		public int getWidth() {
			return width;
		}

		@Override
		public int getHeight() {
			return height;
		}
		
		@Override
		public void setNearest(boolean nearest) {
			this.nearest = nearest;
		}

		@Override
		public void setAnisotropic(boolean anisotropic) {
			this.anisotropic = anisotropic;
		}

		@Override
		public boolean isNearest() {
			return this.nearest;
		}

		@Override
		public boolean isAnisotropic() {
			return this.anisotropic;
		}

	}

	static class ProgramGL implements IProgramGL {

		final int ptr;

		ProgramGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteProgram(this);
		}

	}

	static class UniformGL implements IUniformGL {

		final int ptr;

		UniformGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
		}

	}

	static class ShaderGL implements IShaderGL {

		final int ptr;

		ShaderGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteShader(this);
		}

	}

	static class FramebufferGL implements IFramebufferGL {

		final int ptr;

		FramebufferGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteFramebuffer(this);
		}

	}

	static class RenderbufferGL implements IRenderbufferGL {

		final int ptr;

		RenderbufferGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteRenderbuffer(this);
		}

	}

	static class QueryGL implements IQueryGL {

		final int ptr;

		QueryGL(int ptr) {
			this.ptr = ptr;
		}

		public int hashCode() {
			return ptr;
		}

		@Override
		public void free() {
			PlatformOpenGL._wglDeleteQueries(this);
		}

	}

}