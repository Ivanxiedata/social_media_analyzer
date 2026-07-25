import React from 'react';
import {Composition} from 'remotion';
import {Walkthrough} from './Walkthrough';

export const VideoRoot: React.FC = () => {
  return (
    <Composition
      id="SocialMediaAnalyzerWalkthrough"
      component={Walkthrough}
      durationInFrames={840}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
