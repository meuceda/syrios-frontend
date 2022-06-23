import backGround from 'src/assets/background.jpg';
import { Container, Row, Col} from "react-bootstrap"
import { HeadComponent, TextComponent } from "../ComponentFunction/index";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
function createMarkup(textTran){
    return {__html: textTran};
  }
const CompareCoin = (props)=>{
    let coin_obverse_url = props.coin.coin.data.attributes.obverse_file.data.attributes.url
    let coin_obverse_alt = props.coin.coin.data.attributes.obverse_file.data.attributes.alternativeText
  
    let coin_reverse_url = props.coin.coin.data.attributes.reverse_file.data.attributes.url
    let coin_reverse_alt = props.coin.coin.data.attributes.reverse_file.data.attributes.alternativeText

    let image_sizes = {
        "Smallest": "25%",
        "Smaller": "50%",
        "Small": "75%",
        "Regular": "100%",
        "Big": "125%",
        "Bigger": "150%",
        "Bigest": "175%",
      };
      let caption_padding = {
        "Smallest": "20px 37% 0%",
        "Smaller": "20px 25% 0%",
        "Small": "20px 15% 0%",
        "Regular": "20px 5% 0%",
        "Big": "",
        "Bigger": "",
        "Bigest": "",
      };
    return(
      <Col>
        <Row className={`justify-content-center align-items-center`}>
            <ReactCompareSlider
                {...props}
                itemOne={
                    <ReactCompareSliderImage
                    src={`${process.env.REACT_APP_strapiURL}${coin_obverse_url}`}
                    alt={coin_obverse_alt}
                    />
                }
                itemTwo={
                    <ReactCompareSliderImage
                    src={`${process.env.REACT_APP_strapiURL}${coin_reverse_url}`}
                    alt={coin_reverse_alt}
                    />
                    }
                    // portrait
                style={{
                    display: "flex",
                    width:image_sizes[props.coin.size],
                }}
                />
        </Row>
        <Row className={`justify-content-center align-items-center`}>
            <div 
              dangerouslySetInnerHTML={createMarkup(props.coin.coin_caption)} 
              className={`story-caption text-center ${props.coin.caption_background? "light-blue-background":""}`}
              style={{padding: caption_padding[props.coin.size]}}
            />
        </Row>

      </Col>
    )
  }

const CompareFrame = (props)=>{
    let zone = props.zone
    let grid = {
        "half": 6,
        "third": 4,
        "quarter": 3,
      };
    const CompareBody = ()=>{
        if(zone.cc_text.text === '' && zone.cc_text.caption === ''){
            return(
            <Row className='d-flex justify-content-center align-items-center'>
                <Col xs={`${grid[zone.grid_option]}`} className='d-flex justify-content-center'>
                    <CompareCoin coin={zone.cc_coin}/>
                </Col>
            </Row>
            )
        }
        else{
            if(zone.left_right_switch){    
                    return(
                        <Row className='d-flex justify-content-center align-items-center'>
                            <Col xs={`${grid[zone.grid_option]}`}>
                                <TextComponent text = {zone.cc_text}/>
                            </Col>
                            <Col  className='d-flex justify-content-center'>
                                <CompareCoin coin={zone.cc_coin}/>
                            </Col>
                        </Row>
                    )        
                }
                else{
                    return(
                        <Row className='d-flex justify-content-center align-items-center'>
                        <Col className='d-flex justify-content-center'>
                            <CompareCoin coin={zone.cc_coin}/>
                        </Col>
                        <Col xs={`${grid[zone.grid_option]}`}>
                            <TextComponent text = {zone.cc_text}/>
                        </Col>
                    </Row>
                    )
                }
            }
        }

    if (zone.head.updown_switch){
        return(
          <div 
            className='section' 
            style={{ 
              backgroundImage: zone.background.data == null ? null : `url(${process.env.REACT_APP_strapiURL}${zone.background.data.attributes.url}),url(${backGround})`,
              backgroundBlendMode:'multiply'
            }}
          >
          <Container>
            <CompareBody/>
            <Row className='d-flex justify-content-center mt-5'>
              <HeadComponent storyMain = {zone.head.head_main} storyCaption = {zone.head.head_caption}/>
            </Row>
          </Container>
        </div>
        )
      }
      else{
        return(
          <div 
            className='section' 
            style={{ 
              backgroundImage: zone.background.data == null ? null : `url(${process.env.REACT_APP_strapiURL}${zone.background.data.attributes.url}),url(${backGround})`,
              backgroundBlendMode:'multiply'
            }}
          >
          <Container>
            <Row className='d-flex justify-content-center mb-5 '>
              <HeadComponent storyMain = {zone.head.head_main} storyCaption = {zone.head.head_caption}/>
            </Row>
            <CompareBody/>
          </Container>
        </div>
        )
      }
}

export default CompareFrame
