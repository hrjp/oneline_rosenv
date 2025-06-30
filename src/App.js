import React, { useState, useEffect } from 'react';
import './App.css';
import translations from './translations';

function App() {
  const [gpu, setGpu] = useState(false);
  const [remove, setRemove] = useState(false);
  const [netHost, setNetHost] = useState(true);
  const [rosVersion, setRosVersion] = useState('Jazzy');
  const [containerName, setContainerName] = useState('');
  const [shareFolder, setShareFolder] = useState('');
  const [cudaVersion, setCudaVersion] = useState('none');
  const [copyText, setCopyText] = useState('Copy');
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  const rosOptions = ['Melodic', 'Noetic', 'Foxy', 'Humble', 'Jazzy'];
  const cudaVersionsMap = {
    Melodic: ['none', '11.0.3', '11.1.1', '11.2.2', '11.3.1', '11.4.2'],
    Noetic: ['none', '12.4.1', '12.5.1', '12.6.3', '12.8.1', '12.9.1'],
    Foxy: ['none', '12.4.1', '12.5.1', '12.6.3', '12.8.1', '12.9.1'],
    Humble: ['none', '12.4.1', '12.5.1', '12.6.3', '12.8.1', '12.9.1'],
    Jazzy: ['none', '12.6.3', '12.8.1', '12.9.1'],
  };

  useEffect(() => {
    const lowerRosVersion = rosVersion.toLowerCase();
    if (['Melodic', 'Noetic'].includes(rosVersion)) {
      setContainerName(`ros_${lowerRosVersion}`);
    } else {
      setContainerName(`ros2_${lowerRosVersion}`);
    }
    setCudaVersion('none'); // Reset CUDA version when ROS version changes
  }, [rosVersion]);

  useEffect(() => {
    if (cudaVersion !== 'none') {
      setGpu(true);
    }
  }, [cudaVersion]);

  useEffect(() => {
    if (remove) {
      setContainerName(''); // Clear container name when remove is checked
    }
  }, [remove]);

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
    setCopyText(t.copied);
    setTimeout(() => setCopyText(t.copy), 2000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t.title}</h1>
        <div className="language-switcher">
          <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>English</button>
          <button onClick={() => setLanguage('ja')} className={language === 'ja' ? 'active' : ''}>日本語</button>
        </div>
      </header>
      <div className="selector-container">
        <div className="selector">
          <h2>{t.rosVersion}</h2>
          <p className="description">{t.rosVersionDescription}</p>
          <select value={rosVersion} onChange={(e) => setRosVersion(e.target.value)}>
            {rosOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="selector">
          <h2>{t.containerName}</h2>
          <p className="description">{t.containerNameDescription}</p>
          <input type="text" value={containerName} onChange={(e) => setContainerName(e.target.value)} disabled={remove} />
        </div>
        <div className="selector">
          <h2>{t.shareFolder}</h2>
          <p className="description">{t.shareFolderDescription}</p>
          <input type="text" value={shareFolder} onChange={(e) => setShareFolder(e.target.value)} />
        </div>
        <div className="selector">
          <h2>{t.cudaVersion}</h2>
          <p className="description">{t.cudaVersionDescription}</p>
          <select value={cudaVersion} onChange={(e) => setCudaVersion(e.target.value)}>
            {cudaVersionsMap[rosVersion].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="selector">
          <h2>{t.options}</h2>
          <p className="description">{t.optionsDescription}</p>
          <div className="options">
            <label>
              <input type="checkbox" checked={gpu} onChange={() => setGpu(!gpu)} disabled={cudaVersion !== 'none'} />
              {t.gpuEnabled}
            </label>
            <label>
              <input type="checkbox" checked={remove} onChange={() => setRemove(!remove)} />
              {t.removeOnExit}
            </label>
            <label>
              <input type="checkbox" checked={netHost} onChange={() => setNetHost(!netHost)} />
              {t.useNetHost}
            </label>
          </div>
        </div>
      </div>
      <div className="command-container">
        <h2>{t.generatedCommand}</h2>
        <pre className="command-box">{getCommand()}</pre>
        <button onClick={handleCopy}>{copyText}</button>
      </div>
    </div>
  );
}

export default App;