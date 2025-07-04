
const translations = {
  en: {
    title: 'ROS Docker Environment Generator',
    rosVersion: 'ROS Version',
    rosVersionDescription: 'Select the desired ROS distribution.',
    containerName: 'Container Name',
    containerNameDescription: 'Specify a name for your Docker container.',
    shareFolder: 'Share Folder',
    shareFolderDescription: 'Enter the absolute path to a folder to share with the container. For example: ~/share',
    cudaVersion: 'CUDA Version',
    cudaVersionDescription: 'Choose the CUDA version for GPU support.',
    options: 'Options',
    optionsDescription: 'Additional Docker run options.',
    gpuEnabled: 'GPU Enabled',
    removeOnExit: 'Remove on Exit',
    useNetHost: 'Use --net=host',
    generatedCommand: 'Please run the following command in the terminal:',
    copy: 'Copy',
    copied: 'Copied!',
  },
  ja: {
    title: 'ROS Docker 環境ジェネレーター',
    rosVersion: 'ROSバージョン',
    rosVersionDescription: '希望するROSディストリビューションを選択してください。',
    containerName: 'コンテナ名',
    containerNameDescription: 'Dockerコンテナの名前を指定してください。',
    shareFolder: '共有フォルダ',
    shareFolderDescription: 'コンテナと共有するフォルダの絶対パスを入力してください。例: ~/share',
    cudaVersion: 'CUDAバージョン',
    cudaVersionDescription: 'GPUサポート用のCUDAバージョンを選択してください。',
    options: 'オプション',
    optionsDescription: '追加のDocker runオプション。',
    gpuEnabled: 'GPUを使用する',
    removeOnExit: 'コンテナ終了時に削除',
    useNetHost: 'networkをhostPCと共有する',
    generatedCommand: '以下のコマンドをterminalで実行してください:',
    copy: 'コピー',
    copied: 'コピーしました！',
  },
};

export default translations;
