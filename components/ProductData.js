import React from 'react'

import product1 from '../assets/product1.png'
import herobg1 from '../assets/herobg1.jpg'
import Content1Img1 from '../assets/prod1img1.jpg'
import Content1Img2 from '../assets/prod1img2.jpg'
import Content1Img3 from '../assets/prod1img3.jpg'

import product2 from '../assets/product2.png'
import herobg2 from '../assets/herobg2.jpg'
import Content2Img1 from '../assets/Content2Img1.jpg'
import Content2Img2 from '../assets/Content2Img2.jpg'
import Content2Img3 from '../assets/Content2Img3.jpg'





        const ProductData = [
            {
                id: 1,
                name: "One 3 Cosmic Blue",
                category: "Limited Edition",
                image: product1,
                heroDescription: 
                "One 3 Cosmic Blue equipped with QUACK Mechanics to experience an extraordinary typing feel.",
                price: 699,
                hero: herobg1,
        
                contentImg1: Content1Img1,
                contentTitle1: "Authentic Acoustics",
                contentDescription1: 
                "A multi-layered padding design is present to spotlight raw acoustics from your switches of choice and reduce unwanted noise during use, Moreover a supplementary layer of EVA foam pad is located underneath the PCB to provide further improved sound reduction and the negation of any unwanted sounds."
                ,
        
                contentImg2: Content1Img2,
                contentTitle2: "Detachable USB Type-C",
                contentDescription2: "We use USB HID with the highest frequency of 1000Hz polling rate, meaning the keyboard is sending its input signal(s) to your PC 1000 times per second.",
        
                contentImg3: Content1Img3,
                contentTitle3: "Three keyboard angles",
                contentDescription3: "Two-step keyboard feet allow you to set your keyboard at three different tilt angles.",
        
                dark: 'yes'
            },
            {
                id: 2,
                name: "Ducky Origin Vintage",
                category: "Latest",
                image: product2,
                heroDescription: 
                "The Origin pays tribute to Ducky's roots, where it all began. Our aim was to journey back in time and capture the essence of the original typing experience while infusing it with new innovations.",
                price: 799,
                hero: herobg2,
        
                contentImg1: Content2Img1,
                contentTitle1: "Hot-swap & South-Facing Design",
                contentDescription1: 
                "The large keys support hot-swappable functionality, allowing easy replacement of preferred switches from ESC, Back Space, Enter, left Shift, right Shift, Space Bar, Numeric 0, +, and Enter. The south-facing switch design is compatible with most keycap products on the market, enabling the perfect customization of your keyboard."
                ,
        
                contentImg2: Content2Img2,
                contentTitle2: "Classic Bezel Design",
                contentDescription2: "The Ducky One Origin features a classic ultra-thin bezel design, which not only saves space but also maintains the overall simplicity and beauty of the keyboard design. The retro gray color scheme enhances the cleanliness and sophistication of the keyboard, elevating your work environment to a new level.",
        
                contentImg3: Content2Img3,
                contentTitle3: "PBT Double-Shot Keycaps",
                contentDescription3: "The keycaps of the Ducky One Origin are made of high-quality PBT material, using two-tone molding technology to ensure a clear and durable font that won't fade. Moreover, the keycap's large key supports a hot-swappable feature that allows for easy replacement of different switches, providing a customizable typing experience.",
        
                dark: 'yes'
            },
            
        ]



export default ProductData
