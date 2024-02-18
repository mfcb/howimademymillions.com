import { Box, Typography } from "@mui/material";
import parse, {domToReact} from "html-react-parser";
import PopImage from "../PopImage";
import { ExtLink, Span } from "../util/type";
import Video from "../Video";

export default function WpApiPostContent(props) {
    let pIndex = 0;
    const options = {
        replace: ({name, attribs, parent, children,startIndex}) => {
            if(name === 'figure') {
                let childImg = children.find(child => child.name === 'img');
                const figCaption = children.find(child => child.name === 'figcaption');
                const imgLink = children.find(child => child.name === 'a');
                if(childImg || imgLink) {
                    if(imgLink) {
                        childImg = imgLink.children.find(child => child.name === 'img');
                    }
                    return <PopImage caption={figCaption?.children[0]?.data} href={imgLink?.attribs.href} src={childImg.attribs.src} />
                } else {
                    return <Box component="figure">
                        {domToReact(children, options)}
                    </Box>
                }
            } else if(name === "a") {
                return (<ExtLink href={attribs.href} >{domToReact(children, options)}</ExtLink>)
            } else if(name === "strong") {
                return (<Span bold>{domToReact(children, options)}</Span>)
            } else if(name === "s") {
                return (<Span strike>{domToReact(children, options)}</Span>)
            } else if(name === "p") {
                pIndex++;
                let textAlign = 'center';
                if(attribs.class?.includes("align-left")) {
                    textAlign = "left";
                } else if(attribs.class?.includes("align-right")) {
                    textAlign = "right";
                }
                return (<Typography sx={{
                    marginBottom: theme => theme.spacing(3),
                    textAlign: textAlign,
                }}>{domToReact(children, options)}</Typography>)
            } else if(name === 'img') {
                return <></>
            } else if(name === 'video') {
                return <Video src={attribs.src} />
            } else if(name === 'figcaption') {
                return <></>
            }
        }   
    }
    return props.content && parse(props.content, options)
}