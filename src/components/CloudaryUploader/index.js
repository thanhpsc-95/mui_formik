import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { thumbnail } from "@cloudinary/base/actions/resize";

// Import required qualifiers.
import { face } from "@cloudinary/base/qualifiers/focusOn";
import { focusOn } from "@cloudinary/base/qualifiers/gravity";
const CloudaryUploader = () => {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'demo'
        }
    });

    // Use the image with public ID, 'front_face'.
    const myImage = cld.image('sample');

    // Apply the transformation.
    myImage
        .resize(thumbnail()
            .width(150)
            .height(150)
            .gravity(focusOn(face()))
        )
    return (
        <div>
            <AdvancedImage cldImg={myImage} />
        </div>
    )
}

export default CloudaryUploader
