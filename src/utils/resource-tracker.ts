/** 跟踪threejs创建资源，在适当的时候销毁资源 */
import * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class uniformsMaterial extends THREE.Material {
  uniforms: Array<THREE.Uniform>;
}

interface disposeObject3D extends THREE.Object3D {
  dispose?(): void;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  children: Array<disposeObject3D>;
}

class ResourceTracker {
  resources: Set<disposeObject3D>;
  constructor() {
    this.resources = new Set();
  }
  track(
    resource:
      | disposeObject3D
      | THREE.BufferGeometry
      | THREE.Material
      | Array<disposeObject3D>
      | THREE.Texture
      | THREE.WebGLRenderer
      | OrbitControls
  ) {
    if (!resource) {
      return resource;
    }

    // handle children and when material is an array of materials or
    // uniform is array of textures
    if (Array.isArray(resource)) {
      resource.forEach((resource) => this.track(resource));
      return resource;
    }

    if (resource.dispose || resource instanceof THREE.Object3D) {
      this.resources.add(resource as disposeObject3D);
    }
    if (resource instanceof THREE.Object3D) {
      if (resource.geometry) {
        this.track(resource.geometry);
      }
      if (resource.material) {
        this.track(resource.material);
      }
      this.track(resource.children);
    } else if (resource instanceof uniformsMaterial) {
      // We have to check if there are any textures on the material
      for (const value of Object.values(resource)) {
        if (value instanceof THREE.Texture) {
          this.track(value);
        }
      }
      // We also have to check if any uniforms reference textures or arrays of textures
      if (resource.uniforms) {
        for (const value of Object.values(resource.uniforms)) {
          if (value) {
            const uniformValue = value.value;
            if (
              uniformValue instanceof THREE.Texture ||
              Array.isArray(uniformValue)
            ) {
              this.track(uniformValue);
            }
          }
        }
      }
    }
    return resource;
  }
  untrack(resource: disposeObject3D) {
    this.resources.delete(resource);
  }
  dispose() {
    for (const resource of this.resources) {
      if (resource instanceof THREE.Object3D) {
        if (resource.parent) {
          resource.parent.remove(resource);
        }
      }
      if (resource.dispose) {
        resource.dispose();
      }
    }
    this.resources.clear();
  }
}

export default ResourceTracker;
