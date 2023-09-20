/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import { COLORS, SIZES } from "../../constants/theme";

function PostCardModal({ data }) {
    const [textContent, setTextContent] = useState(data?.content);
    const [textTitle, setTextTitle] = useState(data?.title);
    const [editingContent, setEditingContent] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <Button
                    buttonStyle={{
                        borderColor: COLORS.c3,
                        borderWidth: 2,
                        borderRadius: "10%",
                    }}
                    titleStyle={{
                        color: COLORS.c4,
                        fontSize: SIZES.s1,
                    }}
                    title={!editingTitle ? "Edit Title" : "Done Editing"}
                    type="outline"
                    onPress={() => setEditingTitle(!editingTitle)}
                />
                <Button
                    buttonStyle={{
                        borderColor: COLORS.c3,
                        borderWidth: 2,
                        borderRadius: "10%",
                    }}
                    titleStyle={{
                        color: COLORS.c4,
                        fontSize: SIZES.s1,
                    }}
                    title={!editingContent ? "Edit Content" : "Done Editing"}
                    type="outline"
                    onPress={() => setEditingContent(!editingContent)}
                />
                <Button
                    buttonStyle={{
                        borderColor: COLORS.c3,
                        borderWidth: 2,
                        borderRadius: "10%",
                    }}
                    titleStyle={{
                        color: COLORS.c4,
                        fontSize: SIZES.s1,
                    }}
                    title="Delete Post"
                    type="outline"
                    onPress={() => {}}
                />
            </View>
            {editingTitle ? (
                <Input
                    editable
                    value={textTitle}
                    onChangeText={(text) => setTextTitle(text)}
                    autoFocus
                    multiline
                    style={styles.textEdit}
                />
            ) : editingContent ? (
                <Input
                    editable
                    value={textContent}
                    onChangeText={(text) => setTextContent(text)}
                    autoFocus
                    multiline
                    style={styles.textEdit}
                />
            ) : null}
            <Button
                buttonStyle={{
                    borderColor: COLORS.c3,
                    borderWidth: 2,
                    borderRadius: "10%",
                    marginTop: SIZES.s2,
                }}
                titleStyle={{
                    color: COLORS.c4,
                    fontSize: SIZES.s1,
                }}
                title="Submit Changes"
                type="outline"
                onPress={() => {}}
            />
        </>
    );
}

export default PostCardModal;

const styles = StyleSheet.create({});
