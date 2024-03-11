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

		#define MAX_NUM_OF_POINT_LIGHTS 10
		#define MAX_NUM_OF_SPOT_LIGHTS 10

		varying vec3 frag_normals;
		varying vec4 frag_global_position;
		uniform vec3 color;

		struct PointLight{
			vec3 position;
			vec3 color;

			float constant;
			float linear;
			float quadratic;
		};

		struct SpotLight{
			vec3 position;
			vec3 direction;
			vec3 color;

			float constant;
			float linear;
			float quadratic;

			float cutoff;
		};

		uniform PointLight point_lights[MAX_NUM_OF_POINT_LIGHTS];
		uniform SpotLight spot_lights[MAX_NUM_OF_SPOT_LIGHTS];

		vec3 CalculateDirectionalLight(vec3 light_dir, vec3 light_color, float min_light_level){
			float diffuse = max(dot(frag_normals, normalize(vec3(light_dir.x, -light_dir.y, light_dir.z))), min_light_level);
			return diffuse * light_color * color;
		}

		vec3 CalculatePointLightValues(PointLight light){
			float distance = length(light.position - frag_global_position.xyz);
			vec3 light_direction = normalize(light.position - frag_global_position.xyz);
			float diffuse = max(dot(frag_normals, light_direction), 0.1);
			float attenuation = 1.0 / (light.constant + light.linear * distance +
    		    light.quadratic * (distance * distance));
			return diffuse * attenuation * light.color * color;
		}
		vec3 CalculateSpotLightValues(SpotLight light){
			//float distance = length(light.position - frag_global_position.xyz);
			vec3 light_direction = normalize(frag_global_position.xyz - light.position);
			float value = 0.0;

			float theta = dot(light_direction, normalize(vec3(light.direction.z, light.direction.y, light.direction.x)));
			if(theta > light.cutoff){
				//float attenuation = 1.0 / (light.constant + light.linear * distance +
	    	//	    light.quadratic * (distance * distance));
				value = 1.0;////max(dot(frag_normals, light_direction), 0.0) * attenuation;
			}
			return value * light.color * color;
		}
		void main() {
			vec3 accumulated = vec3(0.0);

			//accumulated += CalculateDirectionalLight(vec3(1,-1,1), vec3(1,1,1), 0.0);

			for(int i = 0; i < MAX_NUM_OF_POINT_LIGHTS; i++){
				if(point_lights[i].constant != 0.0)
					accumulated += CalculatePointLightValues(point_lights[i]);
			}

			for(int i = 0; i < MAX_NUM_OF_SPOT_LIGHTS; i++){
				if(spot_lights[i].constant != 0.0){
					accumulated += CalculateSpotLightValues(spot_lights[i]);
				}
			}
			gl_FragColor = vec4(accumulated, 1);
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
		this.BindAttribute(1, "normals");

		this.points_lights = [];
		this.max_num_of_points_lights = 10;
		for(var i = 0; i < this.max_num_of_points_lights; i++){
			this.points_lights[i] = {};
			var light = this.points_lights[i];
			light.position_loc = this.GetUniformLocation(`points_lights[${i}].position`);
			light.color_loc = this.GetUniformLocation(`points_lights[${i}].color`);
			light.constant_loc = this.GetUniformLocation(`points_lights[${i}].constant`);
			light.linear_loc = this.GetUniformLocation(`points_lights[${i}].linear`);
			light.quadratic_loc = this.GetUniformLocation(`points_lights[${i}].quadratic`);
		};

		this.spot_lights = [];
		this.max_num_of_spot_lights = 10;
		for(var i = 0; i < this.max_num_of_spot_lights; i++){
			this.spot_lights[i] = {};
			var light = this.spot_lights[i];
			light.position_loc = this.GetUniformLocation(`spot_lights[${i}].position`);
			light.direction_loc = this.GetUniformLocation(`spot_lights[${i}].direction`);
			light.color_loc = this.GetUniformLocation(`spot_lights[${i}].color`);
			light.constant_loc = this.GetUniformLocation(`spot_lights[${i}].constant`);
			light.linear_loc = this.GetUniformLocation(`spot_lights[${i}].linear`);
			light.quadratic_loc = this.GetUniformLocation(`spot_lights[${i}].quadratic`);
		  light.cutoff_loc = this.GetUniformLocation(`spot_lights[${i}].cutoff`);
		};
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

	ClearLightsBuffer(){
		this.lights_loc.clear();
	}
}
