/* eslint-disable eqeqeq */
// import {Container,Row} from 'react-bootstrap';
// import backGround from 'src/assets/background.jpg';
import 'src/components/constants.css';
import './Stories.css';
import 'src/components/coin/coinFlip.css';

import Title from 'src/components/StoryComponents/StoryFrames/Title';
import End_Frame from 'src/components/StoryComponents/StoryFrames/End_Frame';
import Frame1 from 'src/components/StoryComponents/StoryFrames/Frame1';
import Frame2 from 'src/components/StoryComponents/StoryFrames/Frame2';
import Frame3 from 'src/components/StoryComponents/StoryFrames/Frame3';
import Frame4 from 'src/components/StoryComponents/StoryFrames/Frame4';
import Frame5 from 'src/components/StoryComponents/StoryFrames/Frame5';
import Frame6 from 'src/components/StoryComponents/StoryFrames/Frame6';
import Frame7 from 'src/components/StoryComponents/StoryFrames/Frame7';
import Frame8 from 'src/components/StoryComponents/StoryFrames/Frame8';
import Frame9 from 'src/components/StoryComponents/StoryFrames/Frame9';
import Frame10 from 'src/components/StoryComponents/StoryFrames/Frame10';
import InteractiveFrame1 from 'src/components/StoryComponents/StoryFrames/InteractiveFrame1';
import InteractiveFrame2 from 'src/components/StoryComponents/StoryFrames/InteractiveFrame2';
import InteractiveFrame3 from 'src/components/StoryComponents/StoryFrames/InteractiveFrame3';
import InteractiveFrame4 from 'src/components/StoryComponents/StoryFrames/InteractiveFrame4';
import InteractiveFrame5 from 'src/components/StoryComponents/StoryFrames/InteractiveFrame5';

// const Testframe =(zone, index) =>{
//   let instance = []
//   for (var i = 0; i < jsonObject.results.bindings.length; i++){
//     instance.push(jsonObject.results.bindings[i].image.value)
//   }

//   return(
//     <div key={`story_comp_${index}`} className='section'  style={{ backgroundImage: zone.background == (undefined || null) ? undefined : `url(${process.env.REACT_APP_strapiURL}${zone.background.url}),url(${backGround})`,
//       backgroundBlendMode:'multiply'}}>
//         <Container>
//           <Row>
//             <img
//               src={zone.image_link}
//               alt= {'test img link'}
//               style={{'max-height':'180px','max-width':'180px'}}
//             />
//           </Row>
//           <Row>
//             <img
//               src={jsonObject.results.bindings[0].image.value} 
//               alt= {'test img link 2'}
//               style={{'max-height':'180px','max-width':'180px'}}
//             />
//           </Row>
//           <Row>
//           <img
//               src={instance[1]}
//               alt= {'test img link 2'}
//               style={{'max-height':'180px','max-width':'180px'}}
//             />
//           </Row>
//         </Container>
//     </div>
//   )
// }
// const Testframe2 =(zone, index) =>{

//   let instance = []
//   for (var i = 0; i < jsonObject.results.bindings.length; i++){
//     instance.push(jsonObject.results.bindings[i].instanceLabel.value)
//   }

//   return(
//     <div key={`story_comp_${index}`} className='section' style={{ backgroundImage: zone.background == (undefined || null) ? undefined : `url(${process.env.REACT_APP_strapiURL}${zone.background.url}),url(${backGround})`,
//       backgroundBlendMode:'multiply'}}>
//         <Container>
//           <Row>
//             {jsonObject.results.bindings[0].instanceLabel.value}
//           </Row>
//           <Row>
//             {instance[0]}
//           </Row>
//         </Container>
//     </div>
//   )
// }

// This function is for mapping name and functions over.
// Did this for organization really. 
const SwitchComponent = (zone, index) => {
  let jsx = undefined;
    switch (zone.__component) {
      case 'frame.title':
        jsx = Title(zone, index);
        break;
      case 'frame.end':
        jsx = End_Frame(zone, index);
        break;
      case 'frame.1':
        jsx = Frame1(zone, index);
        break;
      case 'frame.2':
        jsx = Frame2(zone, index);
        break;
      case 'frame.3':
        jsx = Frame3(zone, index);
        break;
      case 'frame.4':
        jsx = Frame4(zone, index);
        break;
      case 'frame.5':
        jsx = Frame5(zone, index);
        break;
      // case 'frame.6':
      //   jsx = Frame6(zone, index);
      //   break;
      // case 'frame.7':
      //   jsx = Frame7(zone, index);
      //   break;
      // case 'frame.8':
      //   jsx = Frame8(zone, index);
      //   break;
      // case 'frame.9':
      //   jsx = Frame9(zone, index);
      //   break; 
      // case 'frame.10':
      //   jsx = Frame10(zone, index);
      //   break; 
      // case 'frame.interactive-frame1':
      //   jsx = InteractiveFrame1(zone, index);
      //   break;
      // case 'frame.interactive-frame2':
      //   jsx = InteractiveFrame2(zone, index);
      //   break;
      // case 'frame.interactive-frame3':
      //   jsx = InteractiveFrame3(zone, index);
      //   break;
      // case 'frame.interactive-frame4':
      //   jsx = InteractiveFrame4(zone, index);
      //   break;
      // case 'frame.interactive-frame5':
      //   jsx = InteractiveFrame5(zone, index);
      //   break;
      // case 'frame.testframe':
      //   jsx = Testframe(zone, index);
      //   break;
      // case 'frame.testframe2':
      //   jsx = Testframe2(zone, index);
      //   break;
      default:
        console.error(`Error: Unrecognized component '${zone.__component}'`);
    }
    return jsx;
  }
  

  

export default SwitchComponent
