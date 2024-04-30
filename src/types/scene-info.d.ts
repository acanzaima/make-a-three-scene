interface sceneTree {
  name: string;
  id?: string;
  children?: Array<sceneTree>;
}

interface sceneInfo {
  author: string;
  value: string;
  name: string;
  desc: string;
  img: string;
  scene?: sceneTree;
  gitHub?: string;
}

export default sceneInfo;
