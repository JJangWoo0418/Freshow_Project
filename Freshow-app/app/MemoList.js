import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MemoList() {
    // 메모 데이터를 임시로 생성
    const memos = [
        { title: '제목1', content: '메모 내용1', color: '#FFFCED' },
        { title: '제목2', content: '메모 내용2', color: '#CFFFD0' },
        { title: '제목3', content: '메모 내용3', color: '#FFD9C8' },
        { title: '제목4', content: '메모 내용4', color: '#D6CFFF' },
        { title: '제목5', content: '메모 내용5', color: '#D9D9D9' },
        { title: '제목6', content: '메모 내용6', color: '#999999' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.headerTitle}>MEMO</Text>
            </View>
            {memos.map((memo, index) => (
                <View key={index} style={[styles.memoCard, { backgroundColor: memo.color }]}>
                    <View style={styles.memoHeader}>
                        <Text style={styles.memoTitle}>{memo.title}</Text>
                        <Ionicons name="ellipsis-vertical" size={20} color="black" />
                    </View>
                    <Text style={styles.memoContent}>{memo.content}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 24,
        marginLeft: 8,
    },
    memoCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    memoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    memoTitle: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 18,
    },
    memoContent: {
        fontFamily: 'ONE Mobile POP',
        fontSize: 14,
        color: '#555',
    },
});
