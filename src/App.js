

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gpu, setGpu] = useState(false);
  const [remove, setRemove] = useState(false);
  const [netHost, setNetHost] = useState(true);
  const [rosVersion, setRosVersion] = useState('Jazzy');
  const [containerName, setContainerName] = useState('');
  const [shareFolder, setShareFolder] = useState('');
  const [cudaVersion, setCudaVersion] = useState('none');
  const [copyText, setCopyText] = useState('Copy');

  const rosOptions = ['Melodic', 'Noetic', 'Foxy', 'Humble', 'Jazzy'];
  const cudaOptions = ['none', '12.6.3', '12.8.1', '12.9.1'];

  useEffect(() => {
    const lowerRosVersion = rosVersion.toLowerCase();
    if (['Melodic', 'Noetic'].includes(rosVersion)) {
      setContainerName(`ros_${lowerRosVersion}`);
    } else {
      setContainerName(`ros2_${lowerRosVersion}`);
    }
  }, [rosVersion]);

  useEffect(() => {
    if (cudaVersion !== 'none') {
      setGpu(true);
    }
  }, [cudaVersion]);

  const getCommand = () => {
    let command = 'docker run -it';
    if (gpu) command += ' --gpus all';
    if (remove) command += ' --rm';
    if (netHost) command += ' --net=host';

    if (!remove && containerName) {
        command += ` --name ${containerName}`;
    }

    if (shareFolder) command += ` -v ${shareFolder}:/home/share`;
    
    const lowerRosVersion = rosVersion.toLowerCase();
    const rosDistroType = ['Melodic', 'Noetic'].includes(rosVersion) ? 'ros' : 'ros2';
    let imageName = `hrjp/${rosDistroType}:${lowerRosVersion}`;

    if (cudaVersion !== 'none') {
      imageName += `_cuda${cudaVersion}`;
    }

    command += ` \
            -v /dev:/dev \
            -v /tmp/.X11-unix:/tmp/.X11-unix \
            -v $HOME/.Xauthority:/root/.Xauthority:rw \
            -e DISPLAY=$DISPLAY \
            -e QT_X11_NO_MITSHM=1 \
            --privileged \
            ${imageName} /bin/bash`;
    return command;
  };

  const handleCopy = () => {
    const command = getCommand();
    navigator.clipboard.writeText(command);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ROS Docker Environment Generator</h1>
      </header>
      <div className="selector-container">
        <div className="selector">
          <h2>ROS Version</h2>
          <p className="description">Select the desired ROS distribution.</p>
          <select value={rosVersion} onChange={(e) => setRosVersion(e.target.value)}>
            {rosOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="selector">
          <h2>Container Name</h2>
          <p className="description">Specify a name for your Docker container.</p>
          <input type="text" value={containerName} onChange={(e) => setContainerName(e.target.value)} disabled={remove} />
        </div>
        <div className="selector">
          <h2>Share Folder</h2>
          <p className="description">Enter the absolute path to a folder to share with the container.</p>
          <input type="text" value={shareFolder} onChange={(e) => setShareFolder(e.target.value)} />
        </div>
        <div className="selector">
          <h2>CUDA Version</h2>
          <p className="description">Choose the CUDA version for GPU support.</p>
          <select value={cudaVersion} onChange={(e) => setCudaVersion(e.target.value)}>
            {cudaOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="selector">
          <h2>Options</h2>
          <p className="description">Additional Docker run options.</p>
          <div className="options">
            <label>
              <input type="checkbox" checked={gpu} onChange={() => setGpu(!gpu)} disabled={cudaVersion !== 'none'} />
              GPU Enabled
            </label>
            <label>
              <input type="checkbox" checked={remove} onChange={() => setRemove(!remove)} />
              Remove on Exit
            </label>
            <label>
              <input type="checkbox" checked={netHost} onChange={() => setNetHost(!netHost)} />
              Use --net=host
            </label>
          </div>
        </div>
      </div>
      <div className="command-container">
        <h2>Generated Command:</h2>
        <pre className="command-box">{getCommand()}</pre>
        <button onClick={handleCopy}>{copyText}</button>
      </div>
    </div>
  );
}

export default App;
