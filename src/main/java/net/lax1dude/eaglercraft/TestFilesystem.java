package net.lax1dude.eaglercraft;

import java.util.Collection;

import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.FileEntry;
import net.lax1dude.eaglercraft.adapter.teavm.IndexedDBFilesystem;
import net.lax1dude.eaglercraft.adapter.teavm.IndexedDBFilesystem.OpenState;

public class TestFilesystem {
	
    public static void main(String[] args) {
    	OpenState os = IndexedDBFilesystem.initialize();
    	
    	if(os != OpenState.OPENED) {
    		System.out.println("Error: " + os);
    		System.out.println("Detail: " + IndexedDBFilesystem.errorDetail());
    		return;
    	}

    	IndexedDBFilesystem.writeFile("text.txt", "fuck fuck shit".getBytes());
    	IndexedDBFilesystem.writeFile("folder/text.txt", "fuck shit fuck".getBytes());
    	IndexedDBFilesystem.writeFile("folder/eee/text.txt", "shit shit fuck".getBytes());

    	System.out.println("exists text.txt:" + IndexedDBFilesystem.fileExists("text.txt"));
    	System.out.println("exists folder/text.txt:" + IndexedDBFilesystem.fileExists("folder/text.txt"));
    	System.out.println("exists folder/eee/text.txt:" + IndexedDBFilesystem.fileExists("folder/eee/text.txt"));

    	System.out.println("type file text.txt:" + IndexedDBFilesystem.fileExists("text.txt"));
    	System.out.println("type file folder:" + IndexedDBFilesystem.fileExists("folder"));
    	System.out.println("type file folder/text.txt:" + IndexedDBFilesystem.fileExists("folder/text.txt"));
    	System.out.println("type file folder/eee:" + IndexedDBFilesystem.fileExists("folder/eee"));
    	System.out.println("type file folder/eee/text.txt:" + IndexedDBFilesystem.fileExists("folder/eee/text.txt"));

    	System.out.println("type folder text.txt:" + IndexedDBFilesystem.directoryExists("text.txt"));
    	System.out.println("type folder folder:" + IndexedDBFilesystem.directoryExists("folder"));
    	System.out.println("type folder folder/text.txt:" + IndexedDBFilesystem.directoryExists("folder/text.txt"));
    	System.out.println("type folder folder/eee:" + IndexedDBFilesystem.directoryExists("folder/eee"));
    	System.out.println("type folder folder/eee/text.txt:" + IndexedDBFilesystem.directoryExists("folder/eee/text.txt"));

    	System.out.println("data file text.txt:" + new String(IndexedDBFilesystem.readFile("text.txt")));
    	System.out.println("data file folder/text.txt:" + new String(IndexedDBFilesystem.readFile("folder/text.txt")));
    	System.out.println("data file folder/eee/text.txt:" + new String(IndexedDBFilesystem.readFile("folder/eee/text.txt")));

    	System.out.println("copy file text.txt to text2.txt"); IndexedDBFilesystem.copyFile("text.txt", "text2.txt");
    	System.out.println("copy file text.txt to folder2/text2.txt"); IndexedDBFilesystem.copyFile("text.txt", "folder2/text2.txt");
    	System.out.println("copy file folder/text.txt to folder3/eee2/text2.txt:"); IndexedDBFilesystem.copyFile("folder/text.txt", "folder3/eee2/text2.txt");
    	System.out.println("copy file folder3/eee2/text2.txt to text2.txt:"); IndexedDBFilesystem.copyFile("folder3/eee2/text2.txt", "text2.txt");

    	System.out.println("type folder folder2:" + IndexedDBFilesystem.directoryExists("folder2"));
    	System.out.println("type folder folder3:" + IndexedDBFilesystem.directoryExists("folder3"));
    	System.out.println("type folder folder3/eee2:" + IndexedDBFilesystem.directoryExists("folder3/eee2"));

    	System.out.println("data file text.txt:" + new String(IndexedDBFilesystem.readFile("text.txt")));
    	System.out.println("data file folder/text.txt:" + new String(IndexedDBFilesystem.readFile("folder/text.txt")));
    	System.out.println("data file folder/eee/text.txt:" + new String(IndexedDBFilesystem.readFile("folder/eee/text.txt")));
    	System.out.println("data file text2.txt:" + new String(IndexedDBFilesystem.readFile("text2.txt")));
    	System.out.println("data file folder2/text2.txt:" + new String(IndexedDBFilesystem.readFile("folder2/text2.txt")));
    	System.out.println("data file folder3/eee2/text2.txt:" + new String(IndexedDBFilesystem.readFile("folder3/eee2/text2.txt")));
    	
    	System.out.println("data file folder2/tefjfgj.txt:" + IndexedDBFilesystem.readFile("folder2/tefjfgj.txt"));
    	System.out.println("data file folder3/gjjg/text2.txt:" + IndexedDBFilesystem.readFile("folder3/eegjjge2/text2.txt"));

    	System.out.println("move file text.txt to text3.txt"); IndexedDBFilesystem.renameFile("text.txt", "text3.txt");
    	System.out.println("move file text.txt to folder4/text2.txt"); IndexedDBFilesystem.renameFile("text.txt", "folder4/text2.txt");
    	System.out.println("move file text3.txt to folder4/text2.txt"); IndexedDBFilesystem.renameFile("text.txt", "folder4/text3.txt");
    	System.out.println("move file folder22/text.txt to folder3/eee2/text3.txt:"); IndexedDBFilesystem.renameFile("folder22/text.txt", "folder3/eee2/text3.txt");

    	System.out.println("last modified text.txt:" + IndexedDBFilesystem.getLastModified("text.txt"));
    	System.out.println("last modified folder/text.txt:" + IndexedDBFilesystem.getLastModified("folder/text.txt"));
    	System.out.println("last modified folder/eee/text.txt:" + IndexedDBFilesystem.getLastModified("folder/eee/text.txt"));
    	System.out.println("last modified text2.txt:" + IndexedDBFilesystem.getLastModified("text2.txt"));
    	System.out.println("last modified folder2/text2.txt:" + IndexedDBFilesystem.getLastModified("folder2/text2.txt"));
    	System.out.println("last modified folder3/eee2/text2.txt:" + IndexedDBFilesystem.getLastModified("folder3/eee2/text2.txt"));
    	
    	System.out.println("last modified folder2/tefjfgj.txt:" + IndexedDBFilesystem.getLastModified("folder2/tefjfgj.txt"));
    	System.out.println("last modified folder3/gjjg/text2.txt:" + IndexedDBFilesystem.getLastModified("folder3/eegjjge2/text2.txt"));

    	System.out.println("last modified text3.txt: " + IndexedDBFilesystem.getLastModified("text3.txt"));
    	System.out.println("last modified folder4/text2.txt: " + IndexedDBFilesystem.getLastModified("folder4/text2.txt"));
    	System.out.println("last modified folder4/text3.txt: " + IndexedDBFilesystem.getLastModified("folder4/text3.txt"));
    	System.out.println("last modified folder3/eee2/text3.txt:" + IndexedDBFilesystem.getLastModified("folder3/eee2/text3.txt"));

    	System.out.println("delete file text3.txt"); IndexedDBFilesystem.deleteFile("text3.txt");
    	System.out.println("delete file folder4/text2.txt"); IndexedDBFilesystem.deleteFile("folder4/text2.txt");
    	System.out.println("delete file folder4/text2.txt"); IndexedDBFilesystem.deleteFile("folder4/text3.txt");
    	System.out.println("delete file folder4"); IndexedDBFilesystem.deleteFile("folder4");
    	System.out.println("delete file folder3/eee2/text3.txt:"); IndexedDBFilesystem.deleteFile("folder3/eee2/text3.txt");

    	Collection<FileEntry> files = IndexedDBFilesystem.listFiles("", true, true);
    	System.out.println();
    	System.out.println("List all:");
    	listFileList(files);
    	
    	files = IndexedDBFilesystem.listFiles("", false, true);
    	System.out.println();
    	System.out.println("List all files:");
    	listFileList(files);
    	
    	files = IndexedDBFilesystem.listFiles("", false, false);
    	System.out.println();
    	System.out.println("List all files not recursive:");
    	listFileList(files);
    	
    	files = IndexedDBFilesystem.listFiles("folder", true, true);
    	System.out.println();
    	System.out.println("List all files in 'folder':");
    	listFileList(files);
    	
    	files = IndexedDBFilesystem.listFiles("folder", true, false);
    	System.out.println();
    	System.out.println("List all files in 'folder' no recursive:");
    	listFileList(files);
    }
    
    private static void listFileList(Collection<FileEntry> files) {
    	for(FileEntry f : files) {
    		System.out.println(" - " + f.path + " " + f.isDirectory + " " + f.lastModified + " " + f.getName());
    	}
    }

}
