import URLToBlob from "/utils/Parsers/URLToBlob.js";

export default class OBJParser{
    static ReadURLAsOBJMeshData(url, on_finish){
        URLToBlob.ConvertURLToBlob(url, (blob)=>{
            let file_reader = new FileReader();
            file_reader.readAsText(blob);

            file_reader.onload = ()=>{
                var data = file_reader.result;
                var mesh_data = {vertices:[], texture_coords:[], indices:[]};
                var coords = [];
                var lines = data.split('\n');
        
                for(var i = 0; i < lines.length; i++){
                    if(lines[i].startsWith("v ")){
                        var vertices = lines[i].substring(2).split(' ');
                        mesh_data.vertices.push(Number(vertices[0]));
                        mesh_data.vertices.push(Number(vertices[1]));
                        mesh_data.vertices.push(Number(vertices[2]));
                    }else if(lines[i].startsWith("vt ")){
                        var coords = lines[i].substring(3).split(' ');
                        coords.push(Number(coords[0]));
                        coords.push(Number(coords[1]));
                    }else if(lines[i].startsWith("f ")){
                        var line = lines[i].substring(2);
                        var faces = line.split(' ');

                        for(var f = 0; f < faces.length; f++){
                            if(faces[f].includes("/")){
                                //Assume just vertex/texture_coord
                                var data = faces[f].split("/");

                                if(data.length == 3){
                                    mesh_data.indices.push(Number(data[0]) - 1);
                                    mesh_data.texture_coords.push(Number(data[1]));
                                    //Then normals
                                }else{
                                    mesh_data.indices.push(Number(data[0]) - 1);
                                    mesh_data.texture_coords.push(Number(data[1]));
                                }
                            }else{
                                mesh_data.indices.push(Number(faces[0]) - 1);
                                mesh_data.indices.push(Number(faces[1]) - 1);
                                mesh_data.indices.push(Number(faces[2]) - 1);
                            }
                        }
                    }
                }
                on_finish(mesh_data);
            }
        });
    }
}