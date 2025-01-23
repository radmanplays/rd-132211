package com.mojang.rubydung.level;

import com.mojang.rubydung.HitResult;
import com.mojang.rubydung.Player;
import com.mojang.rubydung.phys.AABB;

import static org.lwjgl.opengl.GL11.*;

public class LevelRenderer implements LevelListener {

    private static final int CHUNK_SIZE = 16;

    private final Tessellator tessellator;
    private final Level level;
    private final Chunk[] chunks;

    private final int chunkAmountX;
    private final int chunkAmountY;
    private final int chunkAmountZ;

    /**
     * Create renderer for level
     *
     * @param level The rendered level
     */
    public LevelRenderer(Level level) {
        level.addListener(this);

        this.tessellator = new Tessellator();
        this.level = level;

        // Calculate amount of chunks of level
        this.chunkAmountX = level.width / CHUNK_SIZE;
        this.chunkAmountY = level.depth / CHUNK_SIZE;
        this.chunkAmountZ = level.height / CHUNK_SIZE;

        // Create chunk array
        this.chunks = new Chunk[this.chunkAmountX * this.chunkAmountY * this.chunkAmountZ];

        // Fill level with chunks
        for (int x = 0; x < this.chunkAmountX; x++) {
            for (int y = 0; y < this.chunkAmountY; y++) {
                for (int z = 0; z < this.chunkAmountZ; z++) {
                    // Calculate min bounds for chunk
                    int minChunkX = x * CHUNK_SIZE;
                    int minChunkY = y * CHUNK_SIZE;
                    int minChunkZ = z * CHUNK_SIZE;

                    // Calculate max bounds for chunk
                    int maxChunkX = (x + 1) * CHUNK_SIZE;
                    int maxChunkY = (y + 1) * CHUNK_SIZE;
                    int maxChunkZ = (z + 1) * CHUNK_SIZE;

                    // Check for chunk bounds out of level
                    maxChunkX = Math.min(level.width, maxChunkX);
                    maxChunkY = Math.min(level.depth, maxChunkY);
                    maxChunkZ = Math.min(level.height, maxChunkZ);

                    // Create chunk based on bounds
                    Chunk chunk = new Chunk(level, minChunkX, minChunkY, minChunkZ, maxChunkX, maxChunkY, maxChunkZ);
                    this.chunks[(x + y * this.chunkAmountX) * this.chunkAmountZ + z] = chunk;
                }
            }
        }
    }

    /**
     * Render all chunks of the level
     *
     * @param layer The render layer
     */
    public void render(int layer) {
        // Get current camera frustum
        Frustum frustum = Frustum.getFrustum();

        // Reset global chunk rebuild stats
        Chunk.rebuiltThisFrame = 0;

        // For all chunks
        for (Chunk chunk : this.chunks) {

            // Render if bounding box of chunk is in frustum
            if (frustum.cubeInFrustum(chunk.boundingBox)) {

                // Render chunk
                chunk.render(layer);
            }
        }
    }

    /**
     * Mark all chunks inside of the given area as dirty.
     *
     * @param minX Minimum on X axis
     * @param minY Minimum on Y axis
     * @param minZ Minimum on Z axis
     * @param maxX Maximum on X axis
     * @param maxY Maximum on Y axis
     * @param maxZ Maximum on Z axis
     */
    public void setDirty(int minX, int minY, int minZ, int maxX, int maxY, int maxZ) {
        // To chunk coordinates
        minX /= CHUNK_SIZE;
        minY /= CHUNK_SIZE;
        minZ /= CHUNK_SIZE;
        maxX /= CHUNK_SIZE;
        maxY /= CHUNK_SIZE;
        maxZ /= CHUNK_SIZE;

        // Minimum limit
        minX = Math.max(minX, 0);
        minY = Math.max(minY, 0);
        minZ = Math.max(minZ, 0);

        // Maximum limit
        maxX = Math.min(maxX, this.chunkAmountX - 1);
        maxY = Math.min(maxY, this.chunkAmountY - 1);
        maxZ = Math.min(maxZ, this.chunkAmountZ - 1);

        // Mark all chunks as dirty
        for (int x = minX; x <= maxX; x++) {
            for (int y = minY; y <= maxY; y++) {
                for (int z = minZ; z <= maxZ; z++) {
                    // Get chunk at this position
                    Chunk chunk = this.chunks[(x + y * this.chunkAmountX) * this.chunkAmountZ + z];

                    // Set dirty
                    chunk.setDirty();
                }
            }
        }
    }

    /**
     * Render pick selection face on tile
     *
     * @param player The player
     */
    public void pick(Player player) {
        // Işın parametreleri
        float rayLength = 3.0f; // Maksimum ışın uzunluğu
        float step = 0.1f;      // Işın kontrol adımı
        float x = (float) player.x;
        float y = (float) (player.y + player.height / 2.0f); // Oyuncunun göz yüksekliği
        float z = (float) player.z;

        // Oyuncunun bakış yönü
        float dx = (float) Math.cos(Math.toRadians(player.yRotation)) * (float) Math.cos(Math.toRadians(player.xRotation));
        float dy = (float) Math.sin(Math.toRadians(player.xRotation));
        float dz = (float) Math.sin(Math.toRadians(player.yRotation)) * (float) Math.cos(Math.toRadians(player.xRotation));

        // Işın boyunca ilerleyin
        for (float t = 0; t < rayLength; t += step) {
            int blockX = (int) Math.floor(x + dx * t);
            int blockY = (int) Math.floor(y + dy * t);
            int blockZ = (int) Math.floor(z + dz * t);

            // Blok var mı kontrol et
            if (level.isSolidTile(blockX, blockY, blockZ)) {
                // Blok bulundu, HitResult döndür
                HitResult hit = new HitResult(blockX, blockY, blockZ, 0, (int) t);
                player.setHitResult(hit);
                return;
            }
        }

        // Hiçbir blok bulunamadı
        player.setHitResult(null);
    }

    /**
     * Render hit face of the result
     *
     * @param hitResult The hit result to render
     */
    public void renderHit(HitResult hitResult) {
        // Setup blending and color
        glEnable(GL_BLEND);
        glBlendFunc(GL_SRC_ALPHA, GL_CURRENT_BIT);
        glColor4f(1.0f, 1.0f, 1.0f, (float) Math.sin(System.currentTimeMillis() / 100.0) * 0.2f + 0.4f);

        // Render face
        this.tessellator.init();
        Tile.rock.renderFace(this.tessellator, hitResult.x, hitResult.y, hitResult.z, hitResult.face);
        this.tessellator.flush();

        // Disable blending
        glDisable(GL_BLEND);
    }

    @Override
    public void lightColumnChanged(int x, int z, int minY, int maxY) {
        setDirty(x - 1, minY - 1, z - 1, x + 1, maxY + 1, z + 1);
    }

    @Override
    public void tileChanged(int x, int y, int z) {
        setDirty(x - 1, y - 1, z - 1, x + 1, y + 1, z + 1);
    }

    @Override
    public void allChanged() {
        setDirty(0, 0, 0, this.level.width, this.level.depth, this.level.height);
    }
}
