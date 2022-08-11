import * as React from "react"
import { Dimensions } from 'react-native'
import Svg, { G, Path, Circle, Ellipse, TSpan, Text } from "react-native-svg"

const { width, height } = Dimensions.get('window');

function w(input) {
    return input / 640 * width;
}

function h(input) {
    return input / 1136 * height;
}

export const PlayerDirectory = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(47)}
            height={h(47)}
            viewBox="0 0 47 47"
            {...props}
        >
            <G
                data-name="Group 185"
                transform="translate(-4670.5 -1645.802)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Circle
                    data-name="Ellipse 7"
                    cx={21.395}
                    cy={21.395}
                    r={21.395}
                    transform="translate(4674.209 1649.511)"
                />
                <Path
                    data-name="Path 183"
                    d="M4695.6 1652.721a18.186 18.186 0 11-18.186 18.186"
                />
                <Path
                    data-name="Path 184"
                    d="M4695.6 1666.628a4.279 4.279 0 11-4.279 4.279"
                />
                <Path data-name="Line 151" d="M4695.604 1670.907v-24.605" />
                <Path data-name="Line 152" d="M4695.605 1670.907l-17.398-17.398" />
                <Path data-name="Line 153" d="M4695.605 1670.907H4671" />
            </G>
        </Svg>
    )
}

export const RankingIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(38.238)}
            height={h(47)}
            viewBox="0 0 38.238 47"
            {...props}
        >
            <G
                data-name="Group 186"
                transform="translate(-4673.497 -1840.802)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Circle
                    data-name="Ellipse 8"
                    cx={14}
                    cy={14}
                    r={14}
                    transform="translate(4678.616 1845.921)"
                />
                <Circle
                    data-name="Ellipse 9"
                    cx={11}
                    cy={11}
                    r={11}
                    transform="translate(4681.616 1848.921)"
                />
                <Path
                    data-name="Path 185"
                    d="M4703.568 1874.615v12.685l-11.035-4.381-10.87 4.381v-12.687"
                />
                <Path
                    data-name="Path 186"
                    d="M4692.616 1843.215l4.989-1.913 3.364 4.151 5.277.838.837 5.277 4.152 3.364-1.914 4.989 1.914 4.989-4.152 3.364-.837 5.277-5.277.838-3.364 4.151-4.989-1.913-4.989 1.913-3.364-4.151-5.277-.838-.837-5.277-4.149-3.364 1.913-4.989-1.913-4.989 4.151-3.364.837-5.277 5.277-.838 3.364-4.151z"
                />
            </G>
        </Svg>
    )
}

export const TournamentIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(37.745)}
            height={h(47)}
            viewBox="0 0 37.745 47"
            {...props}
        >
            <G
                data-name="Group 184"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path data-name="Rectangle 271" d="M8.926 40.53h19.9v5.97h-19.9z" />
                <Path
                    data-name="Path 180"
                    d="M10.92 25.823l7.96 2.767 7.959-2.767L30.819.5H6.94z"
                />
                <Path
                    data-name="Path 181"
                    d="M10.28 21.789L7.98 7.144H.5l4.521 11.66z"
                />
                <Path
                    data-name="Path 182"
                    d="M27.465 21.789l2.306-14.645h7.473l-4.521 11.66z"
                />
                <Path data-name="Line 149" d="M18.876 28.59v11.94" />
                <Path data-name="Line 150" d="M7.958 7.144h14.91" />
            </G>
        </Svg>
    )
}

export const MyRabbitIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(37.745)}
            height={h(47)}
            viewBox="0 0 37.207 42.207"
            {...props}
        >
            <G
                data-name="Group 183"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path
                    data-name="Path 177"
                    d="M27.5 9.707v-9h-9v30h18v-21z"
                    fill="none"
                />
                <Path
                    data-name="Path 178"
                    d="M18.5 15.707v-9h-9v30h18v-21z"
                    fill="#212322"
                />
                <Path
                    data-name="Path 179"
                    d="M9.5 20.707v-9h-9v30h18v-21z"
                    fill="#212322"
                />
                <Path data-name="Line 146" fill="#212322" d="M9.5 11.707l9 9" />
                <Path data-name="Line 147" fill="#212322" d="M18.5 6.707l9 9" />
                <Path data-name="Line 148" fill="#212322" d="M27.5.707l9 9" />
            </G>
        </Svg>
    )
}

export const SponsorsIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(40.753)}
            height={h(48.314)}
            viewBox="0 0 40.753 48.314"
            {...props}
        >
            <G
                data-name="Group 182"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <G data-name="Group 180">
                    <Path
                        data-name="Path 176"
                        d="M32.303 16.672l7.95 22.531a8.571 8.571 0 01-8.529 8.611H9.029A8.571 8.571 0 01.5 39.203l7.951-22.531z"
                    />
                    <Path data-name="Line 145" d="M6.105 24.698h14.892" />
                </G>
                <G data-name="Group 181" transform="translate(-4672.091 -1739.488)">
                    <Ellipse
                        data-name="Ellipse 5"
                        cx={2.981}
                        cy={7.951}
                        rx={2.981}
                        ry={7.951}
                        transform="rotate(-25 6271.393 -9688.45)"
                    />
                    <Ellipse
                        data-name="Ellipse 6"
                        cx={7.951}
                        cy={2.981}
                        rx={7.951}
                        ry={2.981}
                        transform="rotate(-65 3722.414 -2804.191)"
                    />
                </G>
            </G>
        </Svg>
    )
}

export const AccountIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(40.478)}
            height={h(47)}
            viewBox="0 0 40.478 47"
            {...props}
        >
            <G
                data-name="Group 179"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path
                    data-name="Path 174"
                    d="M20.239 31.036c10.9 0 19.739 3.462 19.739 7.732S31.141 46.5 20.239 46.5.5 43.038.5 38.768"
                />
                <Path data-name="Line 144" d="M20.239.5v38.268" />
                <Path data-name="Path 175" d="M32.083 8.395L20.24 2.473v11.844z" />
            </G>
        </Svg>
    )
}

export const CrossIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(40.637)}
            height={h(34.819)}
            viewBox="0 0 40.637 34.819"
            {...props}
        >
            <G
                data-name="Group 178"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            >
                <Path data-name="Line 142" d="M1.409 1.409l37.818 32" />
                <Path data-name="Line 143" d="M39.227 1.409l-37.818 32" />
            </G>
        </Svg>
    )
}

export const MenuIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(39.9)}
            height={h(33.5)}
            viewBox="0 0 39.9 33.5"
            {...props}
        >
            <G data-name="Group 563">
                <G
                    data-name="Group 562"
                    fill="none"
                    stroke="#212322"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                >
                    <Path data-name="Line 339" d="M.75.75h38.4" />
                    <Path data-name="Line 340" d="M.75 16.75h25.516" />
                    <Path data-name="Line 341" d="M.75 32.75h38.4" />
                </G>
            </G>
        </Svg>
    )
}

export const UnderlineIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(68.187)}
            height={w(5)}
            viewBox="0 0 68.187 3"
            {...props}
        >
            <Path
                data-name="Line 342"
                fill="none"
                stroke="#76bc21"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M1.5 1.5h65.186"
            />
        </Svg>
    )
}

export const CreateIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(36.604)}
            height={h(60.604)}
            viewBox="0 0 36.604 60.604"
            {...props}
        >
            <G data-name="Group 580">
                <Text
                    data-name="+"
                    transform="translate(12.664 37.545)"
                    fill="#000"
                    fontSize={24}
                    fontFamily="Helvetica"
                >
                    <TSpan x={0} y={0}>
                        {"+"}
                    </TSpan>
                </Text>
            </G>
            <G
                data-name="Group 587"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
            >
                <Path data-name="Path 522" d="M18.25 18.354v-18h-18v60h36v-42z" />
                <Path data-name="Line 346" d="M18.25.354l18 18" />
            </G>
        </Svg>
    )
}

export const RabbitIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(181.5)}
            height={w(301.5)}
            viewBox="0 0 181.5 301.5"
            {...props}
        >
            <G
                data-name="Group 571"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <G data-name="Group 569" stroke="#76bc21">
                    <Path
                        data-name="Path 512"
                        d="M90.75 90.75v-90h-90v300h180v-210z"
                        fill="#fff"
                    />
                    <Path
                        data-name="Path 513"
                        d="M180.75 90.75l-90-90v90z"
                        fill="#d9d9d9"
                    />
                </G>
                <G data-name="Group 570" fill="none">
                    <Path
                        data-name="Path 514"
                        d="M61.487 202.972c23.091-18.223 24.208-64.019 6.412-92.222-32.467 43.143-6.765 120 22.611 120 23.832 0 35.129-46.7 35.129-46.7-17.727-12.009-52.766-11.579-70.259 0 0 0 10.392 46.7 35.13 46.7 28.135 0 56.764-78.027 22.61-120-17.8 28.2-16.679 74 6.412 92.222"
                        stroke="#76bc21"
                    />
                    <Path
                        data-name="Path 515"
                        d="M119.429 121.15c-10.017 16.977-11.185 42.755-2.312 58.55"
                        stroke="#76bc21"
                    />
                    <Path
                        data-name="Path 516"
                        d="M61.622 121.15c10.018 16.977 11.185 42.755 2.312 58.55"
                        stroke="#76bc21"
                    />
                    <Path
                        data-name="Path 517"
                        d="M96.736 210.098c0 3.438-2.788 7.97-6.226 7.97s-6.227-4.532-6.227-7.97 12.453-3.439 12.453 0z"
                        stroke="#212322"
                    />
                </G>
            </G>
        </Svg>
    )
}

export const CancelIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(84.32)}
            height={w(84.32)}
            viewBox="0 0 84.32 84.32"
            {...props}
        >
            <G
                data-name="Component 1 \u2013 1"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
            >
                <Path data-name="Rectangle 578" d="M1.5 1.5h81.32v81.32H1.5z" />
                <Path data-name="Line 333" d="M20.557 21.846l41.922 41.922" />
                <Path data-name="Line 334" d="M20.557 63.768l41.922-41.922" />
            </G>
        </Svg>
    )
}

export const SelectIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(84.32)}
            height={w(84.32)}
            viewBox="0 0 84.32 84.32"
            {...props}
        >
            <Path
                data-name="Path 440"
                d="M66.348 9.481L34.953 56.572 23.929 40.036"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
            />
            <Circle
                data-name="Ellipse 47"
                cx={40.66}
                cy={40.66}
                r={40.66}
                transform="translate(1.5 1.5)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
            />
        </Svg>
    )
}

export const CalcIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(263.146)}
            height={w(263.146)}
            viewBox="0 0 263.146 263.146"
            {...props}
        >
            <G
                data-name="Group 483"
                transform="translate(-5463.427 -5799.427)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.444}
            >
                <Circle
                    data-name="Ellipse 41"
                    cx={130.351}
                    cy={130.351}
                    r={130.351}
                    transform="translate(5464.649 5800.649)"
                    fill="none"
                    stroke="#76bc21"
                    opacity={0.2}
                />
                <Circle
                    data-name="Ellipse 42"
                    cx={97.763}
                    cy={97.763}
                    r={97.763}
                    transform="translate(5497.237 5833.237)"
                    fill="none"
                    stroke="#76bc21"
                    opacity={0.5}
                />
                <Circle
                    data-name="Ellipse 43"
                    cx={65.176}
                    cy={65.176}
                    r={65.176}
                    transform="translate(5529.825 5865.825)"
                    fill="#fff"
                    stroke="#76bc21"
                />
                <G data-name="Group 482">
                    <Path
                        data-name="Path 376"
                        d="M5577.3 5945.758c12.541-9.9 13.148-34.77 3.482-50.088-17.634 23.432-3.674 65.175 12.281 65.175 12.944 0 19.08-25.364 19.08-25.364-9.629-6.522-28.659-6.289-38.16 0 0 0 5.644 25.364 19.08 25.364 15.281 0 30.83-42.379 12.28-65.175-9.665 15.318-9.059 40.191 3.482 50.088"
                        fill="none"
                        stroke="#76bc21"
                    />
                    <Path
                        data-name="Path 377"
                        d="M5608.771 5901.318c-5.441 9.22-6.075 23.221-1.256 31.8"
                        fill="none"
                        stroke="#76bc21"
                    />
                    <Path
                        data-name="Path 378"
                        d="M5577.374 5901.318c5.441 9.22 6.075 23.221 1.256 31.8"
                        fill="none"
                        stroke="#76bc21"
                    />
                    <Path
                        data-name="Path 379"
                        d="M5596.446 5949.628c0 1.868-1.515 4.329-3.382 4.329s-3.382-2.461-3.382-4.329 6.764-1.868 6.764 0z"
                        fill="#fff"
                        stroke="#212322"
                    />
                </G>
            </G>
        </Svg>
    )
}

export const CheckedIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(51.883)}
            height={w(51.884)}
            viewBox="0 0 51.883 51.884"
            {...props}
        >
            <G data-name="Component 3 \u2013 1">
                <G data-name="Component 2 \u2013 1">
                    <Path
                        data-name="Path 251"
                        d="M40.482 6.298L29.857 22.235l-8.248 12.371-6.626-9.94"
                        fill="none"
                        stroke="#212322"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                    />
                </G>
                <G data-name="Component 1 \u2013 1">
                    <Circle
                        data-name="Ellipse 22"
                        cx={24.442}
                        cy={24.442}
                        r={24.442}
                        fill="none"
                        stroke="#212322"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        transform="translate(1.5 1.5)"
                    />
                </G>
            </G>
        </Svg>
    )
}

export const UnCheckedIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(51.883)}
            height={w(51.884)}
            viewBox="0 0 51.883 51.884"
            {...props}
        >
            <G data-name="Group 296">
                <Circle
                    data-name="Ellipse 23"
                    cx={24.442}
                    cy={24.442}
                    r={24.442}
                    transform="translate(1.5 1.5)"
                    fill="none"
                    stroke="#212322"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                />
            </G>
        </Svg>
    )
}

export const GoogleIcon = (props) => {
    return (
        <Svg
            data-name="Component 4 \u2013 1"
            xmlns="http://www.w3.org/2000/svg"
            width={w(30)}
            height={w(30)}
            viewBox="0 0 30 30"
            {...props}
        >
            <Path
                data-name="Path 530"
                d="M15 12.004v5.991h8.5A9.016 9.016 0 1121 8.283l4.239-4.239a14.948 14.948 0 104.46 7.938z"
                fill="#212322"
            />
        </Svg>
    )
}

export const FBIcon = (props) => {
    return (
        <Svg
            data-name="Component 5 \u2013 1"
            xmlns="http://www.w3.org/2000/svg"
            width={w(30)}
            height={w(30)}
            viewBox="0 0 30 30"
            {...props}
        >
            <Path
                data-name="Path 531"
                d="M28.344 0H1.656A1.655 1.655 0 000 1.655v26.689A1.656 1.656 0 001.656 30h14.368V18.382h-3.91v-4.528h3.91v-3.339c0-3.874 2.366-5.984 5.823-5.984a32.147 32.147 0 013.494.178v4.05h-2.4c-1.88 0-2.244.893-2.244 2.2v2.89h4.484l-.584 4.528h-3.9v11.618h7.645a1.657 1.657 0 001.656-1.656V1.655A1.656 1.656 0 0028.344 0z"
                fill="#212322"
            />
        </Svg>
    )
}

export const BackIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={w(30)}
            height={w(30)}
            viewBox="0 0 64.693 85.643"
            {...props}
        >
            <Path
                data-name="Path 222"
                d="M62.612 83.563L1.5 42.822 62.612 2.081"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={8}
            />
        </Svg>
    )
}

export const BridieIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={31}
            height={23.175}
            viewBox="0 0 31 23.175"
            {...props}
        >
            <G
                data-name="Group 5"
                transform="translate(-308.5 -69.192)"
                fill="#74af0d"
            >
                <Path
                    data-name="Path 11"
                    d="M339.5 76.442a7.243 7.243 0 00-13.46-3.722c-.669-.06-1.346-.1-2.04-.1-8.547 0-15.5 4.43-15.5 9.875s6.953 9.875 15.5 9.875 15.5-4.429 15.5-9.875a6.573 6.573 0 00-.721-2.918 7.2 7.2 0 00.721-3.135zm-15.5 3.42a11.224 11.224 0 011.973.192 7.267 7.267 0 004.744 3.471c-.824 1.684-3.549 2.967-6.717 2.967-3.391 0-6.3-1.464-6.887-3.322.597-1.891 3.531-3.308 6.887-3.308zm-6.253.872c1.162-1.314 3.555-2.242 6.253-2.242a11.406 11.406 0 011.322.086c.04.129.09.253.137.379a12.387 12.387 0 00-1.459-.1 10.354 10.354 0 00-6.253 1.877zM324 91.367c-7.995 0-14.5-3.981-14.5-8.875s6.505-8.875 14.5-8.875c.526 0 1.039.028 1.549.064a7.037 7.037 0 00-.454 3.878c-.361-.031-.719-.067-1.1-.067-4.486 0-8 2.2-8 5s3.514 5 8 5c3.834 0 6.946-1.607 7.772-3.824.158.01.317.024.478.024a7.242 7.242 0 005.913-3.07 5.528 5.528 0 01.337 1.87c.005 4.894-6.5 8.875-14.495 8.875zm8.25-8.675a6.25 6.25 0 116.25-6.25 6.257 6.257 0 01-6.25 6.25z"
                />
                <Circle
                    data-name="Ellipse 7"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(333.375 77.567)"
                />
                <Circle
                    data-name="Ellipse 8"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(334.875 75.317)"
                />
                <Circle
                    data-name="Ellipse 9"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(336.375 77.567)"
                />
                <Circle
                    data-name="Ellipse 10"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(331.875 79.817)"
                />
                <Circle
                    data-name="Ellipse 11"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(334.875 79.817)"
                />
            </G>
        </Svg>
    )
}

export const DrivingIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={26.241}
            viewBox="0 0 29 26.241"
            {...props}
        >
            <G data-name="Group 6" fill="#74af0d">
                <Path
                    data-name="Path 12"
                    d="M21.141 1.829c-3.359 0-5.991 1.77-5.991 4.03s2.632 4.03 5.991 4.03 5.992-1.77 5.992-4.03-2.633-4.03-5.992-4.03zm0 7.06c-2.706 0-4.991-1.387-4.991-3.03s2.285-3.03 4.991-3.03 4.992 1.388 4.992 3.03-2.286 3.03-4.992 3.03z"
                />
                <Path
                    data-name="Path 13"
                    d="M27.508 2.617a10.346 10.346 0 00-13.886.118 4.734 4.734 0 00-1.316 3.7c.034.351.077.668.116.953.08.589.155 1.145.025 1.295-.047.054-.235.178-.964.178C4.722 8.861 0 12.255 0 17.114c0 5.119 5.044 9.129 11.483 9.129a12.356 12.356 0 009.411-4.007 5.348 5.348 0 001.369-4.38 7.379 7.379 0 00-1.38-3.268c-.391-.544-.451-.627-.122-1.223.187-.339 1.159-.667 2.1-.984 2.357-.8 5.918-2 6.133-5.968a5.053 5.053 0 00-1.486-3.796zm-4.968 8.814c-1.274.43-2.28.769-2.654 1.448a1.762 1.762 0 00.185 2.291 6.394 6.394 0 011.211 2.874 4.385 4.385 0 01-1.159 3.553 11.494 11.494 0 01-8.64 3.644C5.604 25.241 1 21.67 1 17.112c0-4.338 4.213-7.253 10.483-7.253a2.126 2.126 0 001.717-.52c.429-.492.338-1.161.213-2.087-.037-.274-.079-.579-.112-.917a3.768 3.768 0 011.062-2.929A8.653 8.653 0 0120.649 1a8.527 8.527 0 016.134 2.305 4.073 4.073 0 011.211 3.052c-.178 3.294-3.103 4.281-5.454 5.074z"
                />
                <Path
                    data-name="Path 14"
                    d="M10.158 12.621c-4.169 0-7.56 2.335-7.56 5.206s3.391 5.207 7.56 5.207 7.561-2.336 7.561-5.207-3.392-5.206-7.561-5.206zm0 9.413c-3.618 0-6.56-1.887-6.56-4.207s2.942-4.206 6.56-4.206 6.561 1.887 6.561 4.206-2.943 4.207-6.561 4.207z"
                />
                <Path
                    data-name="Path 15"
                    d="M24.143 4.987c-.447 0-.809.17-.809.381s.362.381.809.381.809-.17.809-.381-.362-.381-.809-.381z"
                />
            </G>
        </Svg>
    )
}

export const ApproachesIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={31}
            height={27.25}
            viewBox="0 0 31 27.25"
            {...props}
        >
            <G
                data-name="Group 4"
                transform="translate(-308.5 -240.063)"
                fill="#74af0d"
            >
                <Path
                    data-name="Path 10"
                    d="M339.489 255.35c0-.072.011-.141.011-.213a7.274 7.274 0 00-.07-.951 15.5 15.5 0 00-30.93 1.377.5.5 0 001 0 14.47 14.47 0 0121.928-12.43 13.618 13.618 0 00-16.039 21.129.5.5 0 10.769-.638 12.611 12.611 0 0116.252-18.843 11.748 11.748 0 10-4.66 22.532.5.5 0 000-1 10.75 10.75 0 118.641-17.119 7.248 7.248 0 103.08 6.511.486.486 0 00.029-.142c0-.072-.01-.142-.011-.213zm-7.239 6.037a6.25 6.25 0 116.078-7.682c.044.252.09.5.116.76.023.293.041.587.045.885a6.253 6.253 0 01-6.239 6.037z"
                />
                <Circle
                    data-name="Ellipse 2"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(333.375 256.262)"
                />
                <Circle
                    data-name="Ellipse 3"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(334.875 254.012)"
                />
                <Circle
                    data-name="Ellipse 4"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(336.375 256.262)"
                />
                <Circle
                    data-name="Ellipse 5"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(331.875 258.512)"
                />
                <Circle
                    data-name="Ellipse 6"
                    cx={0.375}
                    cy={0.375}
                    r={0.375}
                    transform="translate(334.875 258.512)"
                />
            </G>
        </Svg>
    )
}

export const ScramblingIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={31}
            height={30.977}
            viewBox="0 0 31 30.977"
            {...props}
        >
            <G data-name="Group 2" fill="#74af0d">
                <Path
                    data-name="Path 3"
                    d="M23.4 21.65v-4.024l5.2-2.275a.5.5 0 000-.916l-5.5-2.406a.484.484 0 00-.2-.042h-.023c-.023 0-.043.01-.065.014a.477.477 0 00-.154.053c-.01.005-.022 0-.032.011s-.016.02-.026.028a.476.476 0 00-.109.119.489.489 0 00-.036.053.482.482 0 00-.055.218v8.992a45.09 45.09 0 00-4.987-.46l-1.771-3.542h1.366a.5.5 0 00.447-.724l-2.263-4.526h1.066a.5.5 0 00.447-.724l-2.263-4.526h1.066a.5.5 0 00.447-.724l-3-6a.522.522 0 00-.894 0l-3 6a.5.5 0 00.447.724h1.066l-1.065 2.13-1.2-2.4a.522.522 0 00-.895 0l-2.4 4.8a.5.5 0 00.447.724h.691l-1.738 3.477a.5.5 0 00.447.723h.691l-1.737 3.477a.5.5 0 00.447.723h.93l-.921 1.843c-2.562.837-4.268 2.011-4.268 3.507 0 3.248 7.986 5 15.5 5s15.5-1.752 15.5-5C31 23.898 27.724 22.438 23.4 21.65zm0-5.115v-3.284l3.753 1.642zM11.83 6.701a.5.5 0 00-.447-.724h-1.066l2.191-4.382 2.191 4.382h-1.066a.5.5 0 00-.447.724l2.263 4.526h-1.066a.5.5 0 00-.447.724l2.263 4.526h-1.366a.5.5 0 00-.448.724l1.894 3.787c-.259 0-.519-.011-.778-.011a46.449 46.449 0 00-7.02.522l2.149-4.3a.5.5 0 00-.447-.724H8.817l2.263-4.526a.5.5 0 00-.447-.724H9.567zm-5.4 13.164a.5.5 0 00-.425-.238h-.931l1.738-3.476a.5.5 0 00-.448-.724h-.691l1.739-3.476a.5.5 0 00-.448-.724h-.69l1.59-3.182 1.091 2.18-.639 1.278a.5.5 0 00.447.724h1.066l-2.263 4.526a.5.5 0 00.447.724h1.366l-2.117 4.234c-.586.112-1.142.242-1.68.381l.87-1.741a.5.5 0 00-.028-.486zm9.07 10.112c-8.545 0-14.5-2.108-14.5-4s5.955-4 14.5-4a44.565 44.565 0 016.9.51v2.6c-.6.062-1.034.232-1.034.433 0 .254.687.46 1.534.46s1.535-.206 1.535-.46c0-.2-.434-.371-1.035-.433v-2.422c4.088.775 6.6 2.089 6.6 3.315 0 1.889-5.955 3.997-14.5 3.997z"
                />
                <Path
                    data-name="Path 4"
                    d="M15.5 22.356c-6.675 0-12.551 1.563-13.1 3.484a.5.5 0 00.962.274c.266-.936 4.79-2.758 12.135-2.758a.5.5 0 000-1z"
                />
            </G>
        </Svg>
    )
}

export const SandSaveIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={31.024}
            height={31}
            viewBox="0 0 31.024 31"
            {...props}
        >
            <G data-name="Group 1" fill="#74af0d">
                <Path
                    data-name="Path 1"
                    d="M31.012 21.889c-.273-4.458-4.488-7.766-10.933-8.782V5.639l5.2-2.275a.5.5 0 000-.916l-5.5-2.406a.5.5 0 00-.2-.041h-.023a.433.433 0 00-.068.014.46.46 0 00-.151.053c-.01 0-.022 0-.032.011s-.015.019-.025.027a.507.507 0 00-.111.12.431.431 0 00-.035.052.49.49 0 00-.055.219v12.464c-.429-.05-.865-.092-1.311-.123-7.8-.53-13.251 1.994-15.759 4.527a5.927 5.927 0 00-1.994 4.591 4.431 4.431 0 001.81 3.341c1.139.834 3.342 1.632 7.363.7 3.266-.761 3.8.285 4.537 1.736S15.385 31 19.144 31a13.81 13.81 0 009.837-3.767 7.046 7.046 0 002.031-5.344zM20.079 4.547V1.264l3.752 1.642zm8.174 22a12.786 12.786 0 01-9.109 3.454c-3.146 0-3.817-1.322-4.528-2.72-.636-1.25-1.288-2.534-3.558-2.534a9.382 9.382 0 00-2.1.276c-2.891.674-5.155.49-6.547-.528a3.465 3.465 0 01-1.4-2.614 4.972 4.972 0 011.708-3.808c2.353-2.378 7.525-4.739 14.981-4.233 5.473.371 11.983 2.717 12.313 8.111a6.067 6.067 0 01-1.761 4.595z"
                />
                <Path
                    data-name="Path 2"
                    d="M17.359 15.662c-5.892-.566-11.737.766-14.212 3.237a3.588 3.588 0 00-1.194 2.886 2.917 2.917 0 001.223 2.116c1.311.968 3.49 1.2 6.137.644 4.276-.892 4.824.2 5.458 1.456a3.727 3.727 0 003.6 2.442q.423.025.832.025c4.42 0 7.551-2.154 7.893-5.517a4.893 4.893 0 00-1.22-3.554c-1.671-2.042-4.697-3.364-8.517-3.735zm1.074 11.783a2.737 2.737 0 01-2.769-1.9 3.586 3.586 0 00-3.752-2.327 13.994 13.994 0 00-2.8.343c-2.33.484-4.276.315-5.34-.47a1.919 1.919 0 01-.82-1.4 2.6 2.6 0 01.9-2.085c2.244-2.238 7.886-3.477 13.411-2.948 4.793.46 6.971 2.31 7.843 3.374a3.9 3.9 0 011 2.817c-.31 3.049-3.32 4.845-7.673 4.596z"
                />
            </G>
        </Svg>
    )
}

export const PuttingIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={25.234}
            height={31}
            viewBox="0 0 25.234 31"
            {...props}
        >
            <G
                data-name="Group 3"
                transform="translate(-311.383 -511.493)"
                fill="#74af0d"
            >
                <Path
                    data-name="Path 5"
                    d="M334.5 524.53h-1.115v-5.858l.962-5.408a.5.5 0 00-.985-.176l-.69 3.883a1.994 1.994 0 00-1-.251 2.2 2.2 0 00-.461.053l.88-4.687a.5.5 0 00-.982-.186L330 517.812v.033a1.386 1.386 0 00-.039.319v6.366H313.5a2.118 2.118 0 00-2.116 2.116v4.846a2.118 2.118 0 002.116 2.116h2.82a7.9 7.9 0 00-.089 1.116 7.77 7.77 0 0015.54 0 7.9 7.9 0 00-.089-1.116h2.82a2.118 2.118 0 002.116-2.116v-4.846a2.118 2.118 0 00-2.118-2.116zM324 541.493a6.77 6.77 0 116.77-6.769 6.777 6.777 0 01-6.77 6.769zm11.617-10a1.118 1.118 0 01-1.116 1.116h-3.031a7.7 7.7 0 00-.787-1.828h3.817a.5.5 0 000-1h-4.51a7.866 7.866 0 00-1.548-1.423h6.058a.5.5 0 000-1h-8.045a7.667 7.667 0 00-4.912 0H313.5a.5.5 0 000 1h6.059a7.866 7.866 0 00-1.548 1.423H313.5a.5.5 0 000 1h3.818a7.7 7.7 0 00-.787 1.828H313.5a1.118 1.118 0 01-1.116-1.116v-4.846a1.117 1.117 0 011.116-1.116h16.963a.5.5 0 00.5-.5v-6.866c0-.351.466-.444.712-.444s.712.093.712.444v6.866a.5.5 0 00.5.5h1.613a1.117 1.117 0 011.116 1.116z"
                />
                <Path
                    data-name="Path 6"
                    d="M325.616 535.935a.4.4 0 10.4.4.4.4 0 00-.4-.4z"
                />
                <Path
                    data-name="Path 7"
                    d="M327.231 533.512a.4.4 0 10.4.4.4.4 0 00-.4-.4z"
                />
                <Path
                    data-name="Path 8"
                    d="M328.443 536.339a.4.4 0 10.4-.4.4.4 0 00-.4.4z"
                />
                <Circle
                    data-name="Ellipse 1"
                    cx={0.404}
                    cy={0.404}
                    r={0.404}
                    transform="translate(323.596 538.359)"
                />
                <Path
                    data-name="Path 9"
                    d="M327.231 538.359a.4.4 0 10.4.4.4.4 0 00-.4-.4z"
                />
            </G>
        </Svg>
    )
}

export const PremiumAccessIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={31}
            height={31}
            viewBox="0 0 31 31"
            {...props}
        >
            <G data-name="Group 7" fill="#191a1a">
                <Path
                    data-name="Path 16"
                    d="M15.5 0A15.5 15.5 0 1031 15.5 15.517 15.517 0 0015.5 0zm0 30A14.5 14.5 0 1130 15.5 14.517 14.517 0 0115.5 30z"
                />
                <Path
                    data-name="Path 17"
                    d="M15.5 1.875a13.617 13.617 0 00-9.65 23.232c.007.008.008.019.015.027a13.646 13.646 0 001.987 1.634l.039.029c.286.192.58.364.875.532.1.055.188.116.286.168.238.128.482.238.725.35.17.079.335.164.509.236s.365.135.549.2c.244.09.487.182.737.258.115.034.232.058.347.089.32.087.64.172.969.236.029.006.059.008.088.014a13.176 13.176 0 005.048 0c.029-.006.059-.008.088-.014.329-.064.649-.149.969-.236.115-.031.232-.055.347-.089.25-.076.493-.168.737-.258.184-.066.369-.127.549-.2s.339-.157.509-.236c.243-.112.487-.222.725-.35.1-.052.19-.113.286-.168.295-.168.589-.34.875-.532l.039-.029a13.646 13.646 0 001.987-1.634c.007-.008.008-.019.015-.027A13.617 13.617 0 0015.5 1.875zm0 1a12.609 12.609 0 019.1 21.355l-1.083-.233c.082-.079.171-.149.252-.23a11.692 11.692 0 10-16.536 0c.067.066.139.122.206.186l-1.045.267A12.608 12.608 0 0115.5 2.875zm8.06 22.332c-.049.041-.1.077-.148.117-.258.208-.523.408-.8.6-.074.051-.151.1-.226.147-.248.162-.5.318-.761.463-.114.063-.231.122-.347.181q-.332.172-.675.326a12.635 12.635 0 01-1.65.597c-.159.045-.32.085-.482.124-.229.055-.458.109-.689.151-.136.025-.274.042-.411.063-.255.038-.51.077-.766.1-.092.008-.187.008-.279.014a12.673 12.673 0 01-1.828-.008c-.046 0-.092 0-.138-.007-.261-.023-.521-.064-.781-.1-.132-.021-.266-.037-.4-.061-.232-.043-.461-.1-.691-.154-.16-.04-.321-.078-.478-.123a13.831 13.831 0 01-1.17-.398c-.16-.063-.32-.13-.478-.2q-.338-.151-.666-.321c-.118-.061-.236-.122-.353-.187-.253-.142-.5-.293-.742-.451-.081-.053-.164-.1-.245-.16-.263-.18-.517-.373-.765-.572-.059-.048-.12-.093-.179-.142s-.118-.109-.178-.162l1.293-.329a.5.5 0 00.1-.06.17.17 0 00.029-.017.449.449 0 00.124-.1c.01-.01.024-.015.034-.027a.49.49 0 00.106-.32l.239-1.1a9.876 9.876 0 0012.652 0l.3 1.34a.5.5 0 00.383.381l1.211.26c-.041.038-.09.09-.145.135zm-.676-1.985l-.267-1.2a.5.5 0 00-.348-.372.5.5 0 00-.494.127 8.884 8.884 0 01-12.55 0 .5.5 0 00-.842.247l-.261 1.2c-.06-.057-.124-.106-.183-.165a10.693 10.693 0 1115.122 0c-.061.059-.119.107-.177.163z"
                />
                <Path
                    data-name="Path 18"
                    d="M15.5 9a6.5 6.5 0 106.5 6.5A6.507 6.507 0 0015.5 9zm0 12a5.5 5.5 0 115.5-5.5 5.507 5.507 0 01-5.5 5.5z"
                />
                <Path
                    data-name="Path 19"
                    d="M16.833 16.499a.334.334 0 10.334.334.333.333 0 00-.334-.334z"
                />
                <Path
                    data-name="Path 20"
                    d="M18.167 14.499a.334.334 0 10.333.334.334.334 0 00-.333-.334z"
                />
                <Path
                    data-name="Path 21"
                    d="M19.167 16.833a.333.333 0 10.333-.334.333.333 0 00-.333.334z"
                />
                <Path
                    data-name="Path 22"
                    d="M15.5 18.499a.334.334 0 10.333.334.333.333 0 00-.333-.334z"
                />
                <Path
                    data-name="Path 23"
                    d="M18.167 18.499a.334.334 0 10.333.334.334.334 0 00-.333-.334z"
                />
                <Path
                    data-name="Path 24"
                    d="M23.766 14.35l-.981-1.228.071-1.568a.5.5 0 00-.268-.467l-1.4-.723-.572-1.463a.5.5 0 00-.436-.316l-1.568-.093L17.5 7.393a.5.5 0 00-.527-.113l-1.473.553-1.471-.553a.5.5 0 00-.527.113l-1.118 1.1-1.568.093a.5.5 0 00-.436.316l-.572 1.463-1.4.723a.5.5 0 00-.268.467l.071 1.568-.981 1.228a.5.5 0 00-.056.536l.7 1.4-.4 1.521a.5.5 0 00.166.512l1.214 1 .257 1.55a.5.5 0 00.36.4l1.515.417.865 1.312a.508.508 0 00.492.219l1.553-.235 1.323.846a.5.5 0 00.54 0l1.323-.846 1.553.235a.512.512 0 00.492-.219l.865-1.312 1.515-.417a.5.5 0 00.36-.4l.257-1.55 1.214-1a.5.5 0 00.166-.512l-.4-1.521.7-1.4a.5.5 0 00-.038-.537zM22.1 16.365l.363 1.392-1.113.914a.5.5 0 00-.175.305l-.236 1.42-1.387.381a.5.5 0 00-.285.207l-.792 1.2-1.423-.216a.515.515 0 00-.344.073l-1.208.778-1.212-.776a.507.507 0 00-.269-.078.63.63 0 00-.075.005l-1.423.216-.792-1.2a.5.5 0 00-.285-.207l-1.387-.381-.236-1.42a.5.5 0 00-.175-.305l-1.113-.914.363-1.392a.5.5 0 00-.037-.35l-.644-1.287.9-1.124a.5.5 0 00.109-.335l-.066-1.437 1.279-.663a.5.5 0 00.235-.261l.524-1.34 1.437-.086a.5.5 0 00.322-.143l1.024-1.01 1.347.506a.507.507 0 00.352 0l1.347-.506 1.024 1.01a.5.5 0 00.322.143l1.437.086.524 1.34a.5.5 0 00.235.261l1.279.663-.066 1.437a.5.5 0 00.109.335l.9 1.124-.644 1.287a.5.5 0 00-.045.348z"
                />
            </G>
        </Svg>
    )
}


