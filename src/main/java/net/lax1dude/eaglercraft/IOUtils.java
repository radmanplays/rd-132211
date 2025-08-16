package net.lax1dude.eaglercraft;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;
import java.net.URL;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import net.lax1dude.eaglercraft.internal.vfs2.VFile2;

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
public class IOUtils {

	public static final int EOF = -1;
	public static final int DEFAULT_BUFFER_SIZE = 8192;

	private static final char[] SCRATCH_CHAR_BUFFER_WO = charArray();

	public static List<String> readLines(InputStream parInputStream, Charset charset) {
		if (parInputStream instanceof EaglerInputStream) {
			return Arrays.asList(
					new String(((EaglerInputStream) parInputStream).getAsArray(), charset).split("(\\r\\n|\\n|\\r)"));
		} else {
			List<String> ret = new ArrayList<String>();
			try (InputStream is = parInputStream) {
				BufferedReader rd = new BufferedReader(new InputStreamReader(is, charset));
				String s;
				while ((s = rd.readLine()) != null) {
					ret.add(s);
				}
			} catch (IOException ex) {
				return null;
			}
			return ret;
		}
	}

	public static void closeQuietly(Closeable reResourcePack) {
		try {
			reResourcePack.close();
		} catch (Throwable t) {
		}
	}

	public static String inputStreamToString(InputStream is, Charset c) throws IOException {
		if (is instanceof EaglerInputStream) {
			return new String(((EaglerInputStream) is).getAsArray(), c);
		} else {
			try {
				StringBuilder b = new StringBuilder();
				BufferedReader rd = new BufferedReader(new InputStreamReader(is, c));
				String s;
				while ((s = rd.readLine()) != null) {
					b.append(s).append('\n');
				}
				return b.toString();
			} finally {
				is.close();
			}
		}
	}

	public static int readFully(InputStream is, byte[] out) throws IOException {
		int i = 0, j;
		while (i < out.length && (j = is.read(out, i, out.length - i)) != -1) {
			i += j;
		}
		return i;
	}

	public static long skipFully(InputStream is, long skip) throws IOException {
		long i = 0, j;
		while (i < skip && (j = is.skip(skip - i)) != 0) {
			i += j;
		}
		return i;
	}

	public static void skipFully(final Reader reader, final long toSkip) throws IOException {
		final long skipped = skip(reader, toSkip);
		if (skipped != toSkip) {
			throw new EOFException("Chars to skip: " + toSkip + " actual: " + skipped);
		}
	}

	public static long skip(final Reader reader, final long toSkip) throws IOException {
		if (toSkip < 0) {
			throw new IllegalArgumentException("Skip count must be non-negative, actual: " + toSkip);
		}
		long remain = toSkip;
		while (remain > 0) {
			final char[] charArray = getScratchCharArrayWriteOnly();
			final long n = reader.read(charArray, 0, (int) Math.min(remain, charArray.length));
			if (n < 0) {
				break;
			}
			remain -= n;
		}
		return toSkip - remain;
	}

	public static int copy(final InputStream inputStream, final OutputStream outputStream) throws IOException {
		final long count = copyLarge(inputStream, outputStream);
		return count > Integer.MAX_VALUE ? EOF : (int) count;
	}

	public static long copy(final InputStream inputStream, final OutputStream outputStream, final int bufferSize)
			throws IOException {
		return copyLarge(inputStream, outputStream, byteArray(bufferSize));
	}

	public static long copy(final Reader reader, final Appendable output) throws IOException {
		return copy(reader, output, CharBuffer.allocate(DEFAULT_BUFFER_SIZE));
	}

	public static long copy(final Reader reader, final Appendable output, final CharBuffer buffer) throws IOException {
		long count = 0;
		int n;
		while (EOF != (n = reader.read(buffer))) {
			buffer.flip();
			output.append(buffer, 0, n);
			count += n;
		}
		return count;
	}

	public static long copy(final URL url, final VFile2 file) throws IOException {
		try (OutputStream outputStream = file.getOutputStream()) {
			return copy(url, outputStream);
		}
	}

	public static long copy(final URL url, final OutputStream outputStream) throws IOException {
		try (InputStream inputStream = Objects.requireNonNull(url, "url").openStream()) {
			return copyLarge(inputStream, outputStream);
		}
	}

	public static long copyLarge(final InputStream inputStream, final OutputStream outputStream) throws IOException {
		return copy(inputStream, outputStream, DEFAULT_BUFFER_SIZE);
	}

	@SuppressWarnings("resource")
	public static long copyLarge(final InputStream inputStream, final OutputStream outputStream, final byte[] buffer)
			throws IOException {
		Objects.requireNonNull(inputStream, "inputStream");
		Objects.requireNonNull(outputStream, "outputStream");
		long count = 0;
		int n;
		while (EOF != (n = inputStream.read(buffer))) {
			outputStream.write(buffer, 0, n);
			count += n;
		}
		return count;
	}

	public static long copyLarge(final InputStream input, final OutputStream output, final long inputOffset,
			final long length, final byte[] buffer) throws IOException {
		if (inputOffset > 0) {
			skipFully(input, inputOffset);
		}
		if (length == 0) {
			return 0;
		}
		final int bufferLength = buffer.length;
		int bytesToRead = bufferLength;
		if (length > 0 && length < bufferLength) {
			bytesToRead = (int) length;
		}
		int read;
		long totalRead = 0;
		while (bytesToRead > 0 && EOF != (read = input.read(buffer, 0, bytesToRead))) {
			output.write(buffer, 0, read);
			totalRead += read;
			if (length > 0) {
				bytesToRead = (int) Math.min(length - totalRead, bufferLength);
			}
		}
		return totalRead;
	}

	public static long copyLarge(final Reader reader, final Writer writer, final char[] buffer) throws IOException {
		long count = 0;
		int n;
		while (EOF != (n = reader.read(buffer))) {
			writer.write(buffer, 0, n);
			count += n;
		}
		return count;
	}

	public static long copyLarge(final Reader reader, final Writer writer, final long inputOffset, final long length,
			final char[] buffer) throws IOException {
		if (inputOffset > 0) {
			skipFully(reader, inputOffset);
		}
		if (length == 0) {
			return 0;
		}
		int bytesToRead = buffer.length;
		if (length > 0 && length < buffer.length) {
			bytesToRead = (int) length;
		}
		int read;
		long totalRead = 0;
		while (bytesToRead > 0 && EOF != (read = reader.read(buffer, 0, bytesToRead))) {
			writer.write(buffer, 0, read);
			totalRead += read;
			if (length > 0) {
				bytesToRead = (int) Math.min(length - totalRead, buffer.length);
			}
		}
		return totalRead;
	}

	@Deprecated
	public static String toString(final byte[] input) {
		return new String(input, Charset.defaultCharset());
	}

	public static byte[] byteArray() {
		return byteArray(DEFAULT_BUFFER_SIZE);
	}

	public static byte[] byteArray(final int size) {
		return new byte[size];
	}

	private static char[] charArray() {
		return charArray(DEFAULT_BUFFER_SIZE);
	}

	private static char[] charArray(final int size) {
		return new char[size];
	}

	static char[] getScratchCharArrayWriteOnly() {
		return fill0(SCRATCH_CHAR_BUFFER_WO);
	}

	private static char[] fill0(final char[] arr) {
		Arrays.fill(arr, (char) 0);
		return arr;
	}

	public static void write(final String data, final OutputStream output, final Charset charset) throws IOException {
		if (data != null) {
			final byte[] bytes = data.getBytes(charset);
			output.write(bytes);
		}
	}
}