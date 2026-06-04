import { Code, Layout, ShieldCheck, Zap, MessageSquare, BarChart3 } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
    {label:"Features",href:"#features"},
    {label:"Workflow", href:"#workflow"},
    {label:"Pricing",href:"#pricing"},
    {label:"Testimonials",href:"#testimonials"}
]

export const testimonials=[
    {
        user:"John Doe",
        company:"Stellar Solutions",
        image:user1,
        text:"The quotation tool helped me get a clear breakdown of costs for my corporate site. Very professional service and the final website exceeded expectations.",
    },
    {
        user: "Jane Smith",
        company: "Blue Horizon Technologies",
        image:user2,
        text:"I love how transparent the pricing was from the start. The team's expertise in React and Tailwind made our e-commerce site incredibly fast.",
    },
    {
        user:"David Johnson",
        company: "Quantum Innovations",
        image: user3,
        text:"The discovery questions really helped me understand what I needed for my portfolio. The quotation was spot on and delivery was timely.",
    },
    {
        user:"Ronee Brown",
        company:"Fusion Dynamics",
        image:user4,
        text:"Working with this team was a game-changer. They didn't just build a site; they provided a full toolkit to manage my digital presence.",
    },
    {
        user:"Michael Wilson",
        company:"Visionary Creations",
        image:user5,
        text:"I've used many web devs before, but the clarity and professionalism here are unmatched. The quotation system is brilliant.",
    },
    {
        user:"Emily Davis",
        company:"Synergy Systems",
        image:user6,
        text:"The team went above and beyond. From initial quote to final deployment, every step was documented and transparent.",
    }
]

export const features = [
    {
        icon:<Code/>,
        text: "Custom Development",
        description:"High-quality, clean code tailored to your specific business needs and goals."
    },
    {
        icon:<Layout/>,
        text:"Responsive Design",
        description:"Websites that look and perform beautifully on all devices, from mobiles to desktops."
    },
    {
        icon:<ShieldCheck/>,
        text:"Secure by Default",
        description:"Implementing industry-standard security protocols to protect your data and users.",
    },
    {
        icon:<Zap/>,
        text:"High Performance",
        description:"Optimized loading speeds and smooth interactions for the best user experience."
    },
    {
        icon:<MessageSquare/>,
        text:"Consultation & Support",
        description:"Expert advice throughout the development process and reliable post-launch support.",
    },
    {
        icon:<BarChart3/>,
        text:"SEO Optimized",
        description:"Built with SEO best practices to help your website rank better on search engines."
    }
]

export const checklistItems = [
    {
        title:"Discovery & Strategy",
        description:"We start by understanding your goals and planning the perfect structure for your site."
    },
    {
        title:"Design & Prototyping",
        description:"Visualizing your website before a single line of code is written to ensure alignment."
    },
    {
        title: "Development & Testing",
        description:"Building your site with modern tech stacks and rigorous quality assurance."
    },
    {
        title:"Deployment & Launch",
        description:"Going live on your preferred hosting with full optimization and final checks."
    }
]

export const pricingOptions = [
    {
        title:"Starter",
        price:"$500",
        features:[
            "Single Page Landing",
            "Responsive Design",
            "Contact Form",
            "1 Month Support",
        ]
    },
    {
        title:"Professional",
        price:"$1,500",
        features:[
            "Up to 5 Pages",
            "Custom UI/UX Design",
            "CMS Integration",
            "3 Months Support"
        ]
    },
    {
        title:"E-commerce",
        price:"$3,000",
        features:[
            "Full Store Setup",
            "Payment Integration",
            "Inventory Management",
            "6 Months Support"
        ]
    }

]

export const resourcesLinks =[
    {href:"#",text:"Quotation Guide"},
    {href:"#", text:"Portfolio"},
    {href:"#", text:"Services"},
    {href:"#", text:"Blog"},
    {href:"#",text:"Contact Us"},
]


export const platformLinks= [
    {href:"#",text:"React"},
    {href:"#", text:"Next.js"},
    {href:"#", text:"Tailwind CSS"},
    {href:"#", text:"Node.js"},
    {href:"#", text:"PostgreSQL"}
]

export const  communityLinks = [
    {href:"#", text:"LinkedIn"},
    {href:"#", text:"GitHub"},
    {href:"#", text:"Twitter"},
    {href:"#",text:"Instagram"},
    {href:"#", text:"Email"}
]