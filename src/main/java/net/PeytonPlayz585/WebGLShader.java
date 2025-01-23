package main;

import java.util.ArrayList;
import java.util.List;

import org.lwjgl.opengl.GL11;
import org.lwjgl.util.vector.Matrix4f;
import org.lwjgl.util.vector.Vector4f;

public class WebGLShader {
	
	// copyright (c) 2020-2023 lax1dude
    private static String vertexFragmentShader =
    "precision highp int;\n" +
    "precision highp sampler2D;\n" +
    "precision highp float;\n" +
    "\n" +
    "uniform mat4 matrix_m;\n" +
    "uniform mat4 matrix_p;\n" +
    "uniform mat4 matrix_t;\n" +
    "\n" +
    "#ifdef CC_VERT\n" +
    "\n" +
    "in vec3 a_position;\n" +
    "#ifdef CC_a_texture0\n" +
    "in vec2 a_texture0;\n" +
    "#endif\n" +
    "#ifdef CC_a_color\n" +
    "in vec4 a_color;\n" +
    "#endif\n" +
    "#ifdef CC_a_normal\n" +
    "in vec4 a_normal;\n" +
    "#endif\n" +
    "\n" +
    "#ifdef CC_fog\n" +
    "out vec4 v_position;\n" +
    "#endif\n" +
    "#ifdef CC_a_color\n" +
    "out vec4 v_color;\n" +
    "#endif\n" +
    "#ifdef CC_a_normal\n" +
    "out vec4 v_normal;\n" +
    "#endif\n" +
    "#ifdef CC_a_texture0\n" +
    "out vec2 v_texture0;\n" +
    "#endif\n" +
    "\n" +
    "void main(){\n" +
    "\tvec4 pos = matrix_m * vec4(a_position, 1.0);\n" +
    "#ifdef CC_fog\n" +
    "\tv_position = pos;\n" +
    "#endif\n" +
    "#ifdef CC_a_color\n" +
    "\tv_color = a_color;\n" +
    "#endif\n" +
    "#ifdef CC_a_normal\n" +
    "\tv_normal = a_normal;\n" +
    "#endif\n" +
    "#ifdef CC_a_texture0\n" +
    "\tv_texture0 = a_texture0;\n" +
    "#endif\n" +
    "\tgl_Position = matrix_p * pos;\n" +
    "}\n" +
    "\n" +
    "#endif\n" +
    "\n" +
    "#ifdef CC_FRAG\n" +
    "\n" +
    "#ifdef CC_unit0\n" +
    "uniform sampler2D tex0;\n" +
    "#ifndef CC_a_texture0\n" +
    "uniform vec2 texCoordV0;\n" +
    "#endif\n" +
    "#endif\n" +
    "#ifdef CC_lighting\n" +
    "uniform vec3 light0Pos;\n" +
    "uniform vec3 light1Pos;\n" +
    "uniform vec3 normalUniform;\n" +
    "#endif\n" +
    "#ifdef CC_fog\n" +
    "uniform vec4 fogColor;\n" +
    "uniform int fogMode;\n" +
    "uniform float fogStart;\n" +
    "uniform float fogEnd;\n" +
    "uniform float fogDensity;\n" +
    "uniform float fogPremultiply;\n" +
    "#endif\n" +
    "uniform vec4 colorUniform;\n" +
    "#ifdef CC_alphatest\n" +
    "uniform float alphaTestF;\n" +
    "#endif\n" +
    "\n" +
    "#ifdef CC_fog\n" +
    "in vec4 v_position;\n" +
    "#endif\n" +
    "#ifdef CC_a_color\n" +
    "in vec4 v_color;\n" +
    "#endif\n" +
    "#ifdef CC_a_normal\n" +
    "in vec4 v_normal;\n" +
    "#endif\n" +
    "#ifdef CC_a_texture0\n" +
    "in vec2 v_texture0;\n" +
    "#endif\n" +
    "\n" +
    "out vec4 fragColor;\n" +
    "\n" +
    "#define TEX_MAT3x2(mat4In) mat3x2(mat4In[0].xy,mat4In[1].xy,mat4In[3].xy)\n" +
    "\n" +
    "void main(){\n" +
    "#ifdef CC_a_color\n" +
    "\tvec4 color = colorUniform * v_color;\n" +
    "#else\n" +
    "\tvec4 color = colorUniform;\n" +
    "#endif\n" +
    "\t\n" +
    "#ifdef CC_unit0\n" +
    "#ifdef CC_a_texture0\n" +
    "\tcolor *= texture(tex0, (TEX_MAT3x2(matrix_t) * vec3(v_texture0, 1.0)).xy).rgba;\n" +
    "#else\n" +
    "\tcolor *= texture(tex0, (TEX_MAT3x2(matrix_t) * vec3(texCoordV0, 1.0)).xy).rgba;\n" +
    "#endif\n" +
    "#endif\n" +
    "\n" +
    "#ifdef CC_alphatest\n" +
    "\tif(color.a < alphaTestF){\n" +
    "\t\tdiscard;\n" +
    "\t}\n" +
    "#endif\n" +
    "\n" +
    "#ifdef CC_lighting\n" +
    "#ifdef CC_a_normal\n" +
    "\tvec3 normal = ((v_normal.xyz - 0.5) * 2.0);\n" +
    "#else\n" +
    "\tvec3 normal = normalUniform;\n" +
    "#endif\n" +
    "\tnormal = normalize(mat3(matrix_m) * normal);\n" +
    "\tfloat ins = max(dot(normal, -light0Pos), 0.0) + max(dot(normal, -light1Pos), 0.0);\n" +
    "\tcolor.rgb *= min((0.4 + ins * 0.6), 1.0);\n" +
    "#endif\n" +
    "\t\n" +
    "#ifdef CC_fog\n" +
    "\tfloat dist = sqrt(dot(v_position, v_position));\n" +
    "\tfloat i = (fogMode == 1) ? clamp((dist - fogStart) / (fogEnd - fogStart), 0.0, 1.0) : clamp(1.0 - exp(-(fogDensity * dist)), 0.0, 1.0);\n" +
    "\tcolor.rgb = mix(color.rgb, fogColor.xyz, i * fogColor.a);\n" +
    "#endif\n" +
    "\t\n" +
    "\tfragColor = color;\n" +
    "}\n" +
    "\n" +
    "#endif\n" +
    "";

	private static final WebGLShader[] instances = new WebGLShader[128];
	private static final List<WebGLShader> instanceList = new ArrayList<WebGLShader>();
	
	private static String shader = null;

	public static void refreshCoreGL() {
		for (int i = 0; i < instances.length; ++i) {
			if (instances[i] != null) {
				GL11.glDeleteProgram(instances[i].globject);
				instances[i] = null;
			}
		}
		instanceList.clear();
		shader = null;
	}

	public static final int COLOR = 1;
	public static final int NORMAL = 2;
	public static final int TEXTURE0 = 4;
	public static final int LIGHTING = 8;
	public static final int FOG = 16;
	public static final int ALPHATEST = 32;
	public static final int UNIT0 = 64;

	public static WebGLShader instance(int i) {
		WebGLShader s = instances[i];
		if (s == null) {
			boolean CC_a_color = false;
			boolean CC_a_normal = false;
			boolean CC_a_texture0 = false;
			boolean CC_lighting = false;
			boolean CC_fog = false;
			boolean CC_alphatest = false;
			boolean CC_unit0 = false;
			if ((i & COLOR) == COLOR) {
				CC_a_color = true;
			}
			if ((i & NORMAL) == NORMAL) {
				CC_a_normal = true;
			}
			if ((i & TEXTURE0) == TEXTURE0) {
				CC_a_texture0 = true;
			}
			if ((i & LIGHTING) == LIGHTING) {
				CC_lighting = true;
			}
			if ((i & FOG) == FOG) {
				CC_fog = true;
			}
			if ((i & ALPHATEST) == ALPHATEST) {
				CC_alphatest = true;
			}
			if ((i & UNIT0) == UNIT0) {
				CC_unit0 = true;
			}
			s = new WebGLShader(i, CC_a_color, CC_a_normal, CC_a_texture0, CC_lighting, CC_fog, CC_alphatest, CC_unit0);
			instances[i] = s;
			instanceList.add(s);
		}
		return s;
	}

	private final boolean enable_color;
	private final boolean enable_normal;
	private final boolean enable_texture0;
	private final boolean enable_lighting;
	private final boolean enable_fog;
	private final boolean enable_alphatest;
	private final boolean enable_unit0;
	private final ProgramGL globject;

	private UniformGL u_matrix_m = null;
	private UniformGL u_matrix_p = null;
	private UniformGL u_matrix_t = null;

	private UniformGL u_fogColor = null;
	private UniformGL u_fogMode = null;
	private UniformGL u_fogStart = null;
	private UniformGL u_fogEnd = null;
	private UniformGL u_fogDensity = null;
	private UniformGL u_fogPremultiply = null;

	private UniformGL u_colorUniform = null;
	private UniformGL u_normalUniform = null;

	private UniformGL u_alphaTestF = null;

	private UniformGL u_texCoordV0 = null;

	private UniformGL u_light0Pos = null;
	private UniformGL u_light1Pos = null;

	public final int a_position;
	public final int a_texture0;
	private final int a_color;
	private final int a_normal;

	public final StreamBuffer streamBuffer;
	public boolean bufferIsInitialized = false;

	private WebGLShader(int j, boolean CC_a_color, boolean CC_a_normal, boolean CC_a_texture0,
			boolean CC_lighting, boolean CC_fog, boolean CC_alphatest, boolean CC_unit0) {
		enable_color = CC_a_color;
		enable_normal = CC_a_normal;
		enable_texture0 = CC_a_texture0;
		enable_lighting = CC_lighting;
		enable_fog = CC_fog;
		enable_alphatest = CC_alphatest;
		enable_unit0 = CC_unit0;

		if (shader == null) {
			shader = new String(vertexFragmentShader);
		}

		String source = "";
		if (enable_color)
			source += "\n#define CC_a_color\n";
		if (enable_normal)
			source += "#define CC_a_normal\n";
		if (enable_texture0)
			source += "#define CC_a_texture0\n";
		if (enable_lighting)
			source += "#define CC_lighting\n";
		if (enable_fog)
			source += "#define CC_fog\n";
		if (enable_alphatest)
			source += "#define CC_alphatest\n";
		if (enable_unit0)
			source += "#define CC_unit0\n";
		source += shader;

		ShaderGL v = GL11.glCreateShader(WebGL2RenderingContext.VERTEX_SHADER);
		GL11.glShaderSource(v, GL11.glGetShaderHeader() + "\n#define CC_VERT\n" + source);
		GL11.glCompileShader(v);

		if (!GL11.glGetShaderCompiled(v)) {
			System.err.println(("\n\n" + GL11.glGetShaderInfoLog(v)).replace("\n", "\n[main.Main.vertexFragmentShader][CC_VERT] "));
			throw new RuntimeException("broken shader source");
		}

		ShaderGL f = GL11.glCreateShader(WebGL2RenderingContext.FRAGMENT_SHADER);
		GL11.glShaderSource(f, GL11.glGetShaderHeader() + "\n#define CC_FRAG\n" + source);
		GL11.glCompileShader(f);

		if (!GL11.glGetShaderCompiled(f)) {
			System.err.println(("\n\n" + GL11.glGetShaderInfoLog(f)).replace("\n", "\n[main.Main.vertexFragmentShader][CC_FRAG] "));
			throw new RuntimeException("broken shader source");
		}

		globject = GL11.glCreateProgram();
		GL11.glAttachShader(globject, v);
		GL11.glAttachShader(globject, f);

		int i = 0;
		a_position = i++;
		GL11.glBindAttributeLocation(globject, a_position, "a_position");

		if (enable_texture0) {
			a_texture0 = i++;
			GL11.glBindAttributeLocation(globject, a_texture0, "a_texture0");
		} else {
			a_texture0 = -1;
		}
		if (enable_color) {
			a_color = i++;
			GL11.glBindAttributeLocation(globject, a_color, "a_color");
		} else {
			a_color = -1;
		}
		if (enable_normal) {
			a_normal = i++;
			GL11.glBindAttributeLocation(globject, a_normal, "a_normal");
		} else {
			a_normal = -1;
		}

		GL11.glLinkProgram(globject);

		GL11.glDetachShader(globject, v);
		GL11.glDetachShader(globject, f);
		GL11.glDeleteShader(v);
		GL11.glDeleteShader(f);

		if (!GL11.glGetProgramLinked(globject)) {
			System.err.println(("\n\n" + GL11.glGetProgramInfoLog(globject)).replace("\n", "\n[LINKER] "));
			throw new RuntimeException("broken shader source");
		}

		GL11.glUseProgram(globject);

		u_matrix_m = GL11.glGetUniformLocation(globject, "matrix_m");
		u_matrix_p = GL11.glGetUniformLocation(globject, "matrix_p");
		u_matrix_t = GL11.glGetUniformLocation(globject, "matrix_t");

		u_colorUniform = GL11.glGetUniformLocation(globject, "colorUniform");

		if (enable_lighting) {
			u_normalUniform = GL11.glGetUniformLocation(globject, "normalUniform");
			u_light0Pos = GL11.glGetUniformLocation(globject, "light0Pos");
			u_light1Pos = GL11.glGetUniformLocation(globject, "light1Pos");
		}

		if (enable_fog) {
			u_fogColor = GL11.glGetUniformLocation(globject, "fogColor");
			u_fogMode = GL11.glGetUniformLocation(globject, "fogMode");
			u_fogStart = GL11.glGetUniformLocation(globject, "fogStart");
			u_fogEnd = GL11.glGetUniformLocation(globject, "fogEnd");
			u_fogDensity = GL11.glGetUniformLocation(globject, "fogDensity");
			u_fogPremultiply = GL11.glGetUniformLocation(globject, "fogPremultiply");
		}

		if (enable_alphatest) {
			u_alphaTestF = GL11.glGetUniformLocation(globject, "alphaTestF");
		}

		GL11.glUniform1i(GL11.glGetUniformLocation(globject, "tex0"), 0);
		u_texCoordV0 = GL11.glGetUniformLocation(globject, "texCoordV0");

		streamBuffer = new StreamBuffer(0x8000, 3, 8, (vertexArray, vertexBuffer) -> {
			GL11.glBindVertexArray0(vertexArray);
			GL11.glBindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, vertexBuffer);
			setupArrayForProgram();
		});

	}

	public void setupArrayForProgram() {
		GL11.glEnableVertexAttribArray(a_position);
		GL11.glVertexAttribPointer(a_position, 3, WebGL2RenderingContext.FLOAT, false, 28, 0);
		if (enable_texture0) {
			GL11.glEnableVertexAttribArray(a_texture0);
			GL11.glVertexAttribPointer(a_texture0, 2, WebGL2RenderingContext.FLOAT, false, 28, 12);
		}
		if (enable_color) {
			GL11.glEnableVertexAttribArray(a_color);
			GL11.glVertexAttribPointer(a_color, 4, WebGL2RenderingContext.UNSIGNED_BYTE, true, 28, 20);
		}
		if (enable_normal) {
			GL11.glEnableVertexAttribArray(a_normal);
			GL11.glVertexAttribPointer(a_normal, 4, WebGL2RenderingContext.UNSIGNED_BYTE, true, 28, 24);
		}
	}

	public void use() {
		GL11.glUseProgram(globject);
	}

	public void unuse() {

	}
	
	public static void optimize() {
		for(int i = 0, l = instanceList.size(); i < l; ++i) {
			instanceList.get(i).streamBuffer.optimize();
		}
	}

	private float[] modelBuffer = new float[16];
	private float[] projectionBuffer = new float[16];
	private float[] textureBuffer = new float[16];

	private Matrix4f modelMatrix = (Matrix4f) new Matrix4f().setZero();
	private Matrix4f projectionMatrix = (Matrix4f) new Matrix4f().setZero();
	private Matrix4f textureMatrix = (Matrix4f) new Matrix4f().setZero();
	private Vector4f light0Pos = new Vector4f();
	private Vector4f light1Pos = new Vector4f();

	public void modelMatrix(Matrix4f mat) {
		if (!mat.equals(modelMatrix)) {
			modelMatrix.load(mat).store(modelBuffer);
			GL11.glUniformMat4fv(u_matrix_m, modelBuffer);
		}
	}

	public void projectionMatrix(Matrix4f mat) {
		if (!mat.equals(projectionMatrix)) {
			projectionMatrix.load(mat).store(projectionBuffer);
			GL11.glUniformMat4fv(u_matrix_p, projectionBuffer);
		}
	}

	public void textureMatrix(Matrix4f mat) {
		if (!mat.equals(textureMatrix)) {
			textureMatrix.load(mat).store(textureBuffer);
			GL11.glUniformMat4fv(u_matrix_t, textureBuffer);
		}
	}

	public void lightPositions(Vector4f pos0, Vector4f pos1) {
		if (!pos0.equals(light0Pos) || !pos1.equals(light1Pos)) {
			light0Pos.set(pos0);
			light1Pos.set(pos1);
			GL11.glUniform3f(u_light0Pos, light0Pos.x, light0Pos.y, light0Pos.z);
			GL11.glUniform3f(u_light1Pos, light1Pos.x, light1Pos.y, light1Pos.z);
		}
	}

	private int fogMode = 0;

	public void fogMode(int mode) {
		if (fogMode != mode) {
			fogMode = mode;
			GL11.glUniform1i(u_fogMode, mode % 2);
			GL11.glUniform1f(u_fogPremultiply, mode / 2);
		}
	}

	private float fogColorR = 0.0f;
	private float fogColorG = 0.0f;
	private float fogColorB = 0.0f;
	private float fogColorA = 0.0f;

	public void fogColor(float r, float g, float b, float a) {
		if (fogColorR != r || fogColorG != g || fogColorB != b || fogColorA != a) {
			fogColorR = r;
			fogColorG = g;
			fogColorB = b;
			fogColorA = a;
			GL11.glUniform4f(u_fogColor, fogColorR, fogColorG, fogColorB, fogColorA);
		}
	}

	private float fogStart = 0.0f;
	private float fogEnd = 0.0f;

	public void fogStartEnd(float s, float e) {
		if (fogStart != s || fogEnd != e) {
			fogStart = s;
			fogEnd = e;
			GL11.glUniform1f(u_fogStart, fogStart);
			GL11.glUniform1f(u_fogEnd, fogEnd);
		}
	}

	private float fogDensity = 0.0f;

	public void fogDensity(float d) {
		if (fogDensity != d) {
			fogDensity = d;
			GL11.glUniform1f(u_fogDensity, fogDensity);
		}
	}

	private float alphaTestValue = 0.0f;

	public void alphaTest(float limit) {
		if (alphaTestValue != limit) {
			alphaTestValue = limit;
			GL11.glUniform1f(u_alphaTestF, alphaTestValue);
		}
	}

	private float tex0x = 0.0f;
	private float tex0y = 0.0f;

	public void tex0Coords(float x, float y) {
		if (tex0x != x || tex0y != y) {
			tex0x = x;
			tex0y = y;
			GL11.glUniform2f(u_texCoordV0, tex0x, tex0y);
		}
	}

	private float colorUniformR = 0.0f;
	private float colorUniformG = 0.0f;
	private float colorUniformB = 0.0f;
	private float colorUniformA = 0.0f;

	public void color(float r, float g, float b, float a) {
		if (colorUniformR != r || colorUniformG != g || colorUniformB != b || colorUniformA != a) {
			colorUniformR = r;
			colorUniformG = g;
			colorUniformB = b;
			colorUniformA = a;
			GL11.glUniform4f(u_colorUniform, colorUniformR, colorUniformG, colorUniformB, colorUniformA);
		}
	}

	private float normalUniformX = 0.0f;
	private float normalUniformY = 0.0f;
	private float normalUniformZ = 0.0f;

	public void normal(float x, float y, float z) {
		if (normalUniformX != x || normalUniformY != y || normalUniformZ != z) {
			normalUniformX = x;
			normalUniformY = y;
			normalUniformZ = z;
			GL11.glUniform3f(u_normalUniform, normalUniformX, normalUniformY, normalUniformZ);
		}
	}

}