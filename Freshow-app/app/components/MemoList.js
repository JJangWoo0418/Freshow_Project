import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { styles } from '../components/css/MemoListStyle';
import { db } from '../firebaseconfig';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function MemoList() {
    const [memos, setMemos] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedMemo, setSelectedMemo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');

    const fetchMemos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'memos'));
            const fetchedMemos = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // 수정된 시간 기준으로 내림차순 정렬
            fetchedMemos.sort((a, b) => b.updatedAt?.seconds - a.updatedAt?.seconds);

            setMemos(fetchedMemos);
        } catch (error) {
            console.error('Error fetching memos:', error);
        }
    };

    useEffect(() => {
        fetchMemos();
    }, []);

    const createMemo = async () => {
        try {
            const newMemo = {
                title: '',
                content: '',
                color: '#FFFCED',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            const docRef = await addDoc(collection(db, 'memos'), newMemo);
            setMemos([...memos, { id: docRef.id, ...newMemo }]);
        } catch (error) {
            console.error('Error creating memo:', error);
        }
    };

    const deleteMemo = async (id) => {
        try {
            await deleteDoc(doc(db, 'memos', id));
            fetchMemos();
            setShowOptions(false); // 삭제 후 팝업 닫기
        } catch (error) {
            console.error('Error deleting memo:', error);
        }
    };

    const toggleOptions = (memo) => {
        setSelectedMemo(memo);
        setShowOptions(!showOptions);
    };

    const updateMemoColor = async (color) => {
        if (selectedMemo) {
            try {
                await updateDoc(doc(db, 'memos', selectedMemo.id), { color });
                fetchMemos();
                setShowOptions(false);
            } catch (error) {
                console.error('Error updating memo color:', error);
            }
        }
    };

    const toggleEditing = (memo) => {
        setSelectedMemo(memo);
        setTitleInput(memo.title);
        setContentInput(memo.content);
        setIsEditing(!isEditing);
    };

    const updateMemoContent = async (field, value) => {
        if (selectedMemo) {
            try {
                await updateDoc(doc(db, 'memos', selectedMemo.id), {
                    [field]: value,
                    updatedAt: serverTimestamp(), // 수정 시간 업데이트
                });
                fetchMemos();
            } catch (error) {
                console.error('Error updating memo content:', error);
            }
        }
    };

    // 시간 차이를 "n시간 전" 또는 "몇분 전" 형식으로 표시하는 함수
    const getTimeAgo = (timestamp) => {
        if (!timestamp) return '';
        const now = new Date();
        const updatedAt = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000); // Firebase timestamp 처리
        const diffInSeconds = Math.floor((now - updatedAt) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds}초 전`;
        }
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        }
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        }
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}일 전`;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS와 Android의 동작 차이를 반영
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // 키보드 높이에 맞춰 화면 조정
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.header}>
                            <Link href="/home">
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </Link>
                            <Text style={styles.headerTitle}>MEMO</Text>
                            <TouchableOpacity onPress={createMemo}>
                                <Ionicons name="add" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        {memos.map((memo) => (
                            <View
                                key={memo.id}
                                style={[styles.memoCard, { backgroundColor: memo.color || '#FFFCED' }]}
                            >
                                <View style={styles.memoCardTouchable}>
                                    <View style={styles.memoHeader}>
                                        {isEditing && selectedMemo?.id === memo.id ? (
                                            <TextInput
                                                style={styles.memoTitle}
                                                value={titleInput}
                                                onChangeText={(text) => setTitleInput(text)}
                                                onBlur={() => updateMemoContent('title', titleInput)}
                                                placeholder="제목을 입력하세요"
                                                autoFocus
                                            />
                                        ) : (
                                            <TouchableOpacity onPress={() => toggleEditing(memo)}>
                                                <Text style={styles.memoTitle}>
                                                    {memo.title || '제목 없음'}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {isEditing && selectedMemo?.id === memo.id ? (
                                        <TextInput
                                            style={styles.memoContent}
                                            value={contentInput}
                                            onChangeText={(text) => setContentInput(text)}
                                            onBlur={() => updateMemoContent('content', contentInput)}
                                            placeholder="메모 내용을 입력하세요"
                                            multiline
                                            autoFocus
                                        />
                                    ) : (
                                        <TouchableOpacity onPress={() => toggleEditing(memo)}>
                                            <Text style={styles.memoContent}>
                                                {memo.content || '내용 없음'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <TouchableOpacity
                                    onPress={() => toggleOptions(memo)}
                                    style={styles.menuButton}
                                >
                                    <Ionicons name="ellipsis-vertical" size={20} color="black" />
                                </TouchableOpacity>

                                {/* 수정된 시간 표시 */}
                                <Text style={styles.timeAgo}>{getTimeAgo(memo.updatedAt)}</Text>
                            </View>
                        ))}

                        {showOptions && (
                            <Modal transparent={true} animationType="fade">
                                <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
                                    <View style={styles.modalOverlay} />
                                </TouchableWithoutFeedback>
                                <View style={styles.optionsMenu}>
                                    {/* X 버튼을 close 버튼으로 변경 */}
                                    <TouchableOpacity
                                        style={styles.closeButton} // 수정된 스타일
                                        onPress={() => setShowOptions(false)}
                                    >
                                        <Ionicons name="close" size={24} color="black" />
                                    </TouchableOpacity>
                                    <View style={styles.colorGrid}>
                                        <TouchableOpacity
                                            onPress={() => updateMemoColor('#FFFCED')}
                                            style={[styles.colorOption, { backgroundColor: '#FFFCED' }]}
                                        />
                                        <TouchableOpacity
                                            onPress={() => updateMemoColor('#CFFFD0')}
                                            style={[styles.colorOption, { backgroundColor: '#CFFFD0' }]}
                                        />
                                        <TouchableOpacity
                                            onPress={() => updateMemoColor('#FFD9C8')}
                                            style={[styles.colorOption, { backgroundColor: '#FFD9C8' }]}
                                        />
                                        <TouchableOpacity
                                            onPress={() => updateMemoColor('#D6CFFF')}
                                            style={[styles.colorOption, { backgroundColor: '#D6CFFF' }]}
                                        />
                                        <TouchableOpacity
                                            onPress={() => updateMemoColor('#E0F7FA')}
                                            style={[styles.colorOption, { backgroundColor: '#E0F7FA' }]}
                                        />
                                        <TouchableOpacity
                                            onPress={() => updateMemoColor('#FFF3E0')}
                                            style={[styles.colorOption, { backgroundColor: '#FFF3E0' }]}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={styles.deleteOption}
                                        onPress={() => deleteMemo(selectedMemo.id)}
                                    >
                                        <Text style={{ color: 'red' }}>삭제</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        )}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
