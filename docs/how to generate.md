

#### 如何安装依赖

- 为全局安装依赖（如：babel、webpack、react等）：
    ```
        yarn add -W [dependencies] [options]

        # 为全局安装babel dev依赖

        yarn add -W babel --dev
    ```
    在安装完全局依赖后，例如`react`这样的依赖可以作为每个package（即某个workspace）的`peerDependencies`

- 在某个package（即workspace）中安装依赖：
    ```
    yarn workspace [package-name] add [dependencies] [options]

    # e.g. 给babel-form-theme-antd安装antd peer依赖

    yarn workspace babel-form-theme-antd add antd --peer
    ```

- 本地package的依赖安装：
    ```
    # 将本地包package-A作为依赖引入package-B

    lerna add [package-A] --scope=[package-B] [options]

    # e.g. 引入babel-form-theme-antd作为babel-form的dev依赖

    lerna add babel-form-theme-antd --scope=babel-form --dev
    ```

#### 如何清除依赖
- 对于monorepo项目，不仅需要删除根目录下的node_modules，还需要删除各个package里的node_modules以及编译产物

    ```
    # 清除packages下每个包内的node_modules

    lerna clean

    # 手动清除根目录下的node_modules

    rimraf node_modules
    ```

    [为什么lerna clean不能清除根目录下的node_modules](https://github.com/lerna/lerna/issues/1392)

    ```
    # 清除package的编译产物

    yarn workspaces run clean
    ```
