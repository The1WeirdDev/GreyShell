import Globals from "/utils/Webgl/Globals.js";
import Shader from "/utils/Webgl/Display/Shader.js";

export default class ColoredPhongObjectShader extends Shader {
	static vertex_data = `
        precision mediump float;
        attribute vec3 position;
        attribute vec3 normals;
				varying vec3 frag_normals;
				varying vec4 frag_global_position;

        uniform mat4 projection_matrix;
        uniform mat4 view_matrix;
        uniform mat4 transformation_matrix;

        void main() {
					frag_normals = normals;
					frag_global_position = transformation_matrix * vec4(position, 1);
          gl_Position = projection_matrix * view_matrix * frag_global_position;
        }
	`;
	static fragment_data = `
		precision mediump float;

		varying vec3 frag_normals;
		varying vec4 frag_global_position;
		uniform vec3 color;

		struct Light{
			vec3 position;
			vec3 color;

			float constant;
			float linear;
			float quadratic;
		};

		uniform Light light_1;

		vec3 CalculateSpotLightColor(Light light){
			float distance = length(light.position - frag_global_position.xyz);
			vec3 light_direction = normalize(light.position - frag_global_position.xyz);
			float diffuse = max(dot(frag_normals, light_direction), 0.1);
			float attenuation = 1.0 / (light.constant + light.linear * distance +
    		    light.quadratic * (distance * distance));
			return diffuse * attenuation * light.color * color;
		}

		vec3 CalculateDirectionalLight(vec3 light_dir, vec3 light_color, float min_light_level){
			float diffuse = max(dot(frag_normals, normalize(-light_dir)), min_light_level);
			return diffuse * light_color * color;
		}
		void main() {
			vec3 ambient = CalculateDirectionalLight(vec3(1,-1,1), vec3(1,1,1), 0.0);
			vec3 diffuse = CalculateSpotLightColor(light_1);
			gl_FragColor = vec4((ambient + diffuse), 1);
		}
	`;
	constructor() {
		super();
	}

	Create() {
		this.CreateShaders(
			ColoredPhongObjectShader.vertex_data,
			ColoredPhongObjectShader.fragment_data,
		);
		this.projection_matrix_location =
			this.GetUniformLocation("projection_matrix");
		this.view_matrix_location = this.GetUniformLocation("view_matrix");
		this.transformation_matrix_location = this.GetUniformLocation(
			"transformation_matrix",
		);
		this.color_location = this.GetUniformLocation("color");

		this.BindAttribute(0, "position");
		//this.BindAttribute(1, "normals");
	}

	LoadProjectionMatrix(matrix) {
		this.LoadMatrix4x4(this.projection_matrix_location, matrix);
	}

	LoadViewMatrix(matrix) {
		this.LoadMatrix4x4(this.view_matrix_location, matrix);
	}

	LoadTransformationMatrix(matrix) {
		this.LoadMatrix4x4(this.transformation_matrix_location, matrix);
	}

	LoadColorRGB(r, g, b) {
		this.LoadVector3(this.color_location, r / 255, g / 255, b / 255);
	}
}
