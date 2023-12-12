import IcoMoon from 'react-icomoon';
import iconSet from './selection.json';

type IconProps = {
    name: string;
    size: number;
    color: string;
    customStyle?: object;
};

const Icon = ({name, size, color, customStyle}: IconProps) => {
    return (
        <IcoMoon 
            iconSet={iconSet} 
            disableFill={true}
            icon={name}
            size={size}
            color={color}
            style={customStyle}    
        />
    )
}

export default Icon;