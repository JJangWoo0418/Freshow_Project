// MemoList.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { styles } from '../components/css/MemoListStyle';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function MemoList() {
    const [memos, setMemos] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedMemo, setSelectedMemo] = useState(null);

    const fetchMemos = async () => {
        const querySnapshot = await getDocs(collection(db, "memos"));
        const fetchedMemos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMemos(fetchedMemos);
    };

    useEffect(() => {
        fetchMemos();
    }, []);

    const deleteMemo = async (id) => {
        await deleteDoc(doc(db, "memos", id));
        fetchMemos();
    };

    const toggleOptions = (memo) => {
        setSelectedMemo(memo);
        setShowOptions(!showOptions);
    };

    const updateMemoColor = async (color) => {
        if (selectedMemo) {
            await updateDoc(doc(db, "memos", selectedMemo.id), { color });
            fetchMemos();
            setShowOptions(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Link href="/home">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Link>
                <Text style={styles.headerTitle}>MEMO</Text>
            </View>

            {memos.map((memo, index) => (
                <View key={memo.id} style={[styles.memoCard, { backgroundColor: memo.color || '#FFFCED' }]}>
                    <View style={styles.memoHeader}>
                        <Text style={styles.memoTitle}>{memo.title || `메모 ${index + 1}`}</Text>
                        <TouchableOpacity onPress={() => toggleOptions(memo)}>
                            <Ionicons name="ellipsis-vertical" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.memoContent}>{memo.content}</Text>
                </View>
            ))}

            {showOptions && (
                <Modal transparent={true} animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.optionsMenu}>
                        <TouchableOpacity onPress={() => updateMemoColor('#FFFCED')}>
                            <Text>색 변경</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteMemo(selectedMemo.id)}>
                            <Text>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
}
