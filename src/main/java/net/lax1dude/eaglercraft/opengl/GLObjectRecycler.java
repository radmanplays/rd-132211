/*
 * Copyright (c) 2025 lax1dude. All Rights Reserved.
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

package net.lax1dude.eaglercraft.opengl;

import java.util.ArrayDeque;
import java.util.Deque;

public abstract class GLObjectRecycler<T> {

	private Deque<T> deletedObjects;

	private final int reserveSize;

	public GLObjectRecycler(int reserveSize) {
		this.reserveSize = reserveSize;
		this.deletedObjects = new ArrayDeque<>(reserveSize << 1);
	}

	public T createObject() {
		T ret = deletedObjects.pollLast();
		if (ret != null) {
			return ret;
		} else {
			return create();
		}
	}

	public void destroyObject(T obj) {
		invalidate(obj);
		deletedObjects.addLast(obj);
	}

	public void compact() {
		while (deletedObjects.size() > reserveSize) {
			destroy(deletedObjects.removeFirst());
		}
	}

	protected abstract T create();
	
	protected abstract void invalidate(T object);

	protected abstract void destroy(T object);

}