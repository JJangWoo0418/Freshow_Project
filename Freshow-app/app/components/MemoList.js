import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { styles } from '../components/css/MemoListStyle';

export default function MemoList() {
    const initialMemos = [
        { title: '제목1', content: '메모 내용1', color: '#FFFCED' },
        { title: '제목2', content: '메모 내용2', color: '#CFFFD0' },
        { title: '제목3', content: '메모 내용3', color: '#FFD9C8' },
        { title: '제목4', content: '메모 내용4', color: '#D6CFFF' },
        { title: '제목5', content: '메모 내용5', color: '#D9D9D9' },
        { title: '제목6', content: '메모 내용6', color: '#999999' },
    ];

    const [memos, setMemos] = useState(initialMemos);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedMemoIndex, setSelectedMemoIndex] = useState(null);

    const addMemo = () => {
        setMemos([...memos, { title: '새 메모', content: '내용을 입력하세요', color: '#FFFCED' }]);
    };

    const openColorPicker = (index) => {
        setSelectedMemoIndex(index);
        setShowColorPicker(true);
    };

    const changeMemoColor = (color) => {
        const updatedMemos = [...memos];
        updatedMemos[selectedMemoIndex].color = color;
        setMemos(updatedMemos);
        setShowColorPicker(false);
    };

    const deleteMemo = () => {
        const updatedMemos = [...memos];
        updatedMemos.splice(selectedMemoIndex, 1);
        setMemos(updatedMemos);
        setShowColorPicker(false);
    };

    const closeModal = () => {
        setShowColorPicker(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Link href="/home">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Link>
                <Text style={styles.headerTitle}>MEMO</Text>
                <TouchableOpacity onPress={addMemo}>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {memos.map((memo, index) => (
                <View key={index} style={[styles.memoCard, { backgroundColor: memo.color }]}>
                    <View style={styles.memoHeader}>
                        <Text style={[styles.memoTitle, memo.color === '#000000' && { color: '#FFFFFF' }]}>
                            {memo.title}
                        </Text>
                        <TouchableOpacity onPress={() => openColorPicker(index)}>
                            <Ionicons name="ellipsis-vertical" size={20} color={memo.color === '#000000' ? 'white' : 'black'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.memoContent, memo.color === '#000000' && { color: '#FFFFFF' }]}>
                        {memo.content}
                    </Text>
                </View>
            ))}

            <Modal visible={showColorPicker} transparent={true} animationType="slide">
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View style={styles.colorPicker}>
                                <TouchableOpacity onPress={() => changeMemoColor('#FFFCED')} style={[styles.colorOption, { backgroundColor: '#FFFCED' }]} />
                                <TouchableOpacity onPress={() => changeMemoColor('#CFFFD0')} style={[styles.colorOption, { backgroundColor: '#CFFFD0' }]} />
                                <TouchableOpacity onPress={() => changeMemoColor('#FFD9C8')} style={[styles.colorOption, { backgroundColor: '#FFD9C8' }]} />
                                <TouchableOpacity onPress={() => changeMemoColor('#D6CFFF')} style={[styles.colorOption, { backgroundColor: '#D6CFFF' }]} />
                                <TouchableOpacity onPress={() => changeMemoColor('#D9D9D9')} style={[styles.colorOption, { backgroundColor: '#D9D9D9' }]} />
                                <TouchableOpacity onPress={() => changeMemoColor('#999999')} style={[styles.colorOption, { backgroundColor: '#999999' }]} />
                                <TouchableOpacity onPress={deleteMemo} style={styles.deleteOption}>
                                    <Ionicons name="trash" size={24} color="gray" />
                                    <Text style={styles.deleteText}>삭제</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    );
}
