package org.lwjgl;

public class PointerWrapperAbstract implements PointerWrapper {

    protected final long pointer;

	protected PointerWrapperAbstract(final long pointer) {
		this.pointer = pointer;
	}

    public boolean isValid() {
		return pointer != 0;
	}

    public final void checkValid() {
		if (LWJGLUtil.DEBUG && !isValid()) {
			throw new IllegalStateException("This " + getClass().getSimpleName() + " pointer is not valid.");
        }
	}

    public final long getPointer() {
		checkValid();
		return pointer;
	}

    public boolean equals(final Object o) {
		if (this == o) { 
            return true;
        }
		if (!(o instanceof PointerWrapperAbstract)) {
            return false;
        }

		final PointerWrapperAbstract that = (PointerWrapperAbstract)o;

		if (pointer != that.pointer) { 
            return false;
        }

		return true;
	}

    public int hashCode() {
		return (int)(pointer ^ (pointer >>> 32));
	}

	public String toString() {
		return getClass().getSimpleName() + " pointer (0x" + Long.toHexString(pointer).toUpperCase() + ")";
	}
}