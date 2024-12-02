import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export const HalfBackground = ({ children }: { children: ReactNode }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.half, styles.topHalf]} />
            <View style={[styles.half, styles.bottomHalf]} />

            <View style={StyleSheet.absoluteFillObject}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    half: {
        flex: 1,
    },
    topHalf: {
        backgroundColor: "#2567E8",
    },
    bottomHalf: {
        backgroundColor: "#fff",
    },
});
