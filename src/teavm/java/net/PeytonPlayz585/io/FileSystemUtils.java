package net.PeytonPlayz585.io;

import java.util.Collection;

import net.PeytonPlayz585.opengl.LWJGLMain;
import net.minecraft.src.IProgressUpdate;

public class FileSystemUtils {
	
	public static void recursiveDeleteDirectory(String dir) {
		Collection<LWJGLMain.FileEntry> lst = LWJGLMain.listFiles(dir, true, true);
		for(LWJGLMain.FileEntry t : lst) {
			if(!t.isDirectory) {
				LWJGLMain.deleteFile(t.path);
			}
		}
		for(LWJGLMain.FileEntry t : lst) {
			if(t.isDirectory) {
				LWJGLMain.deleteFile(t.path);
			}
		}
		LWJGLMain.deleteFile(dir);
	}

	public static void recursiveDeleteDirectoryWithProgress(String dir, String title, String subText, IProgressUpdate progress) {
		progress.displayLoadingString(title, "(please wait)");
		Collection<LWJGLMain.FileEntry> lst = LWJGLMain.listFiles(dir, true, true);
		int totalDeleted = 0;
		int lastTotalDeleted = 0;
		for(LWJGLMain.FileEntry t : lst) {
			if(!t.isDirectory) {
				LWJGLMain.deleteFile(t.path);
				++totalDeleted;
				if(totalDeleted - lastTotalDeleted >= 10) {
					lastTotalDeleted = totalDeleted;
					int percentage = (int) Math.ceil(((double) totalDeleted / lst.size()) * 100);
					progress.displayLoadingString(title, subText.replace("%i", "" + totalDeleted));
					progress.setLoadingProgress(percentage);
				}
			}
		}
		for(LWJGLMain.FileEntry t : lst) {
			if(t.isDirectory) {
				LWJGLMain.deleteFile(t.path);
			}
		}
		LWJGLMain.deleteFile(dir);
	}

}