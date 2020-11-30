import React, {Component} from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Animated
} from "react-native";

export default class DraggableCard extends Component {
    constructor() {
        super();
        this.state = {
            pan: new Animated.ValueXY()
        };
        this._val = {x: 0, y: 0}
        this.state.pan.addListener((value) => this._val = value);
        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
                onStartShouldSetPanResponder: (e, gesture) => true,
                onPanResponderGrant: (e, gesture) => {
                    this.state.pan.setOffset({
                        x: this._val.x,
                        y: this._val.y
                    })
                    this.state.pan.setValue({x: 0, y: 0})
                },
                onPanResponderMove: Animated.event([
                    null, {dx: this.state.pan.x, dy: this.state.pan.y}
                ]),
                onPanResponderRelease: (e, gesture) => {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 5
                    }).start();
                }
            }
        );
    }


    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[panStyle, styles.circle]}
            />
        );
    }
}

let
    CIRCLE_RADIUS = 30;
let
    styles = StyleSheet.create({
        circle: {
            backgroundColor: "skyblue",
            width: CIRCLE_RADIUS * 2,
            height: CIRCLE_RADIUS * 2,
            borderRadius: CIRCLE_RADIUS
        }
    });
