package net.lax1dude.eaglercraft.internal.teavm;

import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Uint8Array;

import com.jcraft.jzlib.CRC32;
import com.jcraft.jzlib.GZIPInputStream;
import com.jcraft.jzlib.InflaterInputStream;

import net.lax1dude.eaglercraft.internal.PlatformAssets;

import net.lax1dude.eaglercraft.IOUtils;

/**
 * Copyright (c) 2022 lax1dude. All Rights Reserved.
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
public class EPKLoader {

	public static void loadEPK(ArrayBuffer epkFile, Map<String, byte[]> loadedFiles) throws IOException {
		loadEPK(epkFile, "", loadedFiles);
	}

	public static void loadEPK(ArrayBuffer epkFile, String path, Map<String, byte[]> loadedFiles) throws IOException {
		int byteLength = epkFile.getByteLength();
		int l = byteLength - 16;
		if(l < 1) {
			throw new IOException("EPK file is incomplete");
		}
		
		ArrayBufferInputStream is = new ArrayBufferInputStream(epkFile, 0, byteLength - 8);
		
		byte[] header = new byte[8];
		IOUtils.readFully(is, header);
		String type = readASCII(header);
		
		if(!"EAGPKG$$".equals(type)) {
			throw new IOException("Invalid EPK file type '" + type + "'");
		}
		
		Uint8Array readEndCode = Uint8Array.create(epkFile, byteLength - 8, 8);
		
		byte[] endCode = new byte[] { (byte)':', (byte)':', (byte)':', (byte)'Y',
				(byte)'E', (byte)'E', (byte)':', (byte)'>' };
		for(int i = 0; i < 8; ++i) {
			if(readEndCode.get(i) != endCode[i]) {
				throw new IOException("EPK file is missing EOF code (:::YEE:>)");
			}
		}
		
		String vers = readASCII(is);
		if(!vers.startsWith("ver2.")) {
			throw new IOException("Unknown or invalid EPK version: " + vers);
		}
		
		IOUtils.skipFully(is, loadByte(is)); // skip filenameAdd commentMore actions
		IOUtils.skipFully(is, loadShort(is)); // skip comment
		IOUtils.skipFully(is, 8); // skip millis date
		
		int numFiles = loadInt(is);
		
		char compressionType = (char)loadByte(is);
		
		InputStream zis;
		switch(compressionType) {
		case 'G':
			zis = new GZIPInputStream(is);
			break;
		case 'Z':
			zis = new InflaterInputStream(is);
			break;
		case '0':
			zis = is;
			break;
		default:
			throw new IOException("Invalid or unsupported EPK compression: " + compressionType);
		}

		int blockFile = ('F' << 24) | ('I' << 16) | ('L' << 8) | 'E';
		int blockEnd = ('E' << 24) | ('N' << 16) | ('D' << 8) | '$';
		int blockHead = ('H' << 24) | ('E' << 16) | ('A' << 8) | 'D';
		
		if(path.length() > 0 && !path.endsWith("/")) {
			path = path + "/";
		}
		
		CRC32 crc32 = new CRC32();
		int blockType;
		for(int i = 0; i < numFiles; ++i) {
			
			blockType = loadInt(zis);
			
			if(blockType == blockEnd) {
				throw new IOException("Unexpected END when there are still " + (numFiles - i) + " files remaining");
			}
			
			String name = readASCII(zis);
			int len = loadInt(zis);
			
			if(i == 0) {
				if(blockType == blockHead) {
					byte[] readType = new byte[len];
					IOUtils.readFully(zis, readType);
					if(!"file-type".equals(name) || !"epk/resources".equals(readASCII(readType))) {
						throw new IOException("EPK is not of file-type 'epk/resources'!");
					}
					if(loadByte(zis) != '>') {
						throw new IOException("Object '" + name + "' is incomplete");
					}
					continue;
				}else {
					throw new IOException("File '" + name + "' did not have a file-type block as the first entry in the file");
				}
			}
			
			if(blockType == blockFile) {
				if(len < 5) {
					throw new IOException("File '" + name + "' is incomplete");
				}
				
				int expectedCRC = loadInt(zis);
				
				byte[] load = new byte[len - 5];
				IOUtils.readFully(zis, load);

				if(len > 5) {
					crc32.reset();
					crc32.update(load, 0, load.length);
					if(expectedCRC != (int)crc32.getValue()) {
						throw new IOException("File '" + name + "' has an invalid checksum");
					}
				}
				
				if(loadByte(zis) != ':') {
					throw new IOException("File '" + name + "' is incomplete");
				}
				String s = path + name;
				loadedFiles.put(path + name, load);
			}else {
				IOUtils.skipFully(zis, len);
			}

			if(loadByte(zis) != '>') {
				throw new IOException("Object '" + name + "' is incomplete");
			}
		}
		
		if(loadInt(zis) != blockEnd) {
			throw new IOException("EPK missing END$ object");
		}
		
		zis.close();
	}
	
	private static int loadByte(InputStream is) throws IOException {
		int i = is.read();
		if (i < 0) {
			throw new EOFException();
		}
		return i;
	}

	private static int loadShort(InputStream is) throws IOException {
		return (loadByte(is) << 8) | loadByte(is);
	}

	private static int loadInt(InputStream is) throws IOException {
		return (loadByte(is) << 24) | (loadByte(is) << 16) | (loadByte(is) << 8) | loadByte(is);
	}

	private static String readASCII(byte[] bytesIn) throws IOException {
		char[] charIn = new char[bytesIn.length];
		for(int i = 0; i < bytesIn.length; ++i) {
			charIn[i] = (char)((int)bytesIn[i] & 0xFF);
		}
		return new String(charIn);
	}

	private static String readASCII(InputStream bytesIn) throws IOException {
		int len = loadByte(bytesIn);
		char[] charIn = new char[len];
		for(int i = 0; i < len; ++i) {
			charIn[i] = (char)loadByte(bytesIn);
		}
		return new String(charIn);
	}

}
