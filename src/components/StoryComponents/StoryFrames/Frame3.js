/* eslint-disable eqeqeq */
import backGround from 'src/assets/background.jpg';
import { subcomponent_image_with_dynamic_sizing } from "../ComponentFunction/index";
import { Container, Row } from "react-bootstrap"

function createMarkup(textTran){
  return {__html: textTran};
}
const Frame3 = (zone, index, jsonObject) => {
  if(zone.head.updown_switch){
    return(
      <div key={`story_comp_${index}`} className='section' style={{ backgroundImage: zone.background == (undefined || null) ? undefined : `url(${process.env.REACT_APP_strapiURL}${zone.background.url}),url(${backGround})`,backgroundBlendMode:'multiply'}}>
        <Container>
          {subcomponent_image_with_dynamic_sizing(zone.images)}
        </Container>
        <Container>
          <Row className='d-flex justify-content-center mb-5'>
              <div dangerouslySetInnerHTML={createMarkup(zone.head.head_main)} className='OrangeText MainText text-center'/>
              <div dangerouslySetInnerHTML={createMarkup(zone.head.head_caption)} className='GrayText CaptionText text-center'/>
          </Row>
        </Container>
      </div>
    )
  }
  else{
    return(
      <div key={`story_comp_${index}`} className='section' style={{ backgroundImage: zone.background == (undefined || null) ? undefined : `url(${process.env.REACT_APP_strapiURL}${zone.background.url}),url(${backGround})`,backgroundBlendMode:'multiply'}}>
        <Container>
          <Row className='d-flex justify-content-center mb-5'>
              <div dangerouslySetInnerHTML={createMarkup(zone.head.head_main)} className='OrangeText MainText text-center'/>
              <div dangerouslySetInnerHTML={createMarkup(zone.head.head_caption)} className='GrayText CaptionText text-center'/>
          </Row>
        </Container>
        <Container>
          {subcomponent_image_with_dynamic_sizing(zone.images)}
        </Container>
      </div>
    )
  }

}

export default Frame3