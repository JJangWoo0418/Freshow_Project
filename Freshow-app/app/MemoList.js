import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Pressable, // Pressable로 변경
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { styles } from '../app/components/css/MemoListStyle';
import { db, auth } from './firebaseconfig';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore';

// expo-router를 사용하는 경우
import { useLocalSearchParams } from 'expo-router';

export default function MemoList() {
    const { fridgeId } = useLocalSearchParams(); // fridgeId 받아오기
    const [memos, setMemos] = useState([]);
    const [selectedMemo, setSelectedMemo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    // DB 경로 설정
    // Firestore에서 올바른 경로로 메모 가져오기
const getMemoCollection = () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.error('사용자가 로그인되어 있지 않습니다.');
        return null;
    }
    if (!fridgeId) {
        console.error('냉장고 ID가 필요합니다.');
        return null;
    }

    // 냉장고 ID 경로에 맞게 Firestore 컬렉션 반환
    return collection(db, '계정', currentUser.uid, '냉장고', fridgeId, '메모');
};

// 메모 가져오기 함수
const fetchMemos = async () => {
    const memoCollection = getMemoCollection();
    if (!memoCollection) return;

    try {
        const querySnapshot = await getDocs(memoCollection);
        const fetchedMemos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMemos(fetchedMemos.sort((a, b) => b.updatedAt?.seconds - a.updatedAt?.seconds)); // 최신순 정렬
    } catch (error) {
        console.error('메모 불러오기 오류:', error);
    }
};

    // 새 메모 생성
    const createMemo = async () => {
        try {
            const newMemo = {
                title: '',
                content: '',
                color: '#FFFCED',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            const docRef = await addDoc(getMemoCollection(), newMemo);
            setMemos((prevMemos) => [{ id: docRef.id, ...newMemo }, ...prevMemos]);
        } catch (error) {
            console.error('메모 생성 오류:', error);
        }
    };

    // 메모 수정
    const updateMemoContent = async (field, value) => {
        try {
            if (!selectedMemo) return;
            const memoDoc = doc(
                db,
                '계정',
                auth.currentUser.uid,
                '냉장고',
                fridgeId,
                '메모',
                selectedMemo.id
            );
            await updateDoc(memoDoc, {
                [field]: value,
                updatedAt: serverTimestamp(),
            });
            setMemos((prevMemos) =>
                prevMemos.map((memo) =>
                    memo.id === selectedMemo.id ? { ...memo, [field]: value } : memo
                )
            );
        } catch (error) {
            console.error('메모 수정 오류:', error);
        }
    };

    // 메모 삭제
    const deleteMemo = async (id) => {
        try {
            const memoDoc = doc(
                db,
                '계정',
                auth.currentUser.uid,
                '냉장고',
                fridgeId,
                '메모',
                id
            );
            await deleteDoc(memoDoc);
            setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== id));
            setShowOptions(false);
        } catch (error) {
            console.error('메모 삭제 오류:', error);
        }
    };

    // 마지막 수정 시간 표시
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

    useEffect(() => {
        if (fridgeId) {
            fetchMemos();
        }
    }, [fridgeId]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable onPress={Keyboard.dismiss}>
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
                            <View key={memo.id} style={[styles.memoCard, { backgroundColor: memo.color || '#FFFCED' }]}>
                                <TextInput
                                    style={styles.memoTitle}
                                    value={selectedMemo?.id === memo.id ? titleInput : memo.title}
                                    onFocus={() => {
                                        setSelectedMemo(memo);
                                        setTitleInput(memo.title);
                                        setContentInput(memo.content);
                                        setIsEditing(true); // 제목 수정할 때만 활성화
                                    }}
                                    onChangeText={(text) => setTitleInput(text)}
                                    onBlur={() => {
                                        if (titleInput !== memo.title) {
                                            updateMemoContent('title', titleInput);
                                        }
                                        setIsEditing(false);
                                    }}
                                    placeholder="제목을 입력하세요"
                                />
                                <TextInput
                                    style={styles.memoContent}
                                    value={selectedMemo?.id === memo.id ? contentInput : memo.content}
                                    onFocus={() => {
                                        setSelectedMemo(memo);
                                        setTitleInput(memo.title);
                                        setContentInput(memo.content);
                                        setIsEditing(true); // 내용 수정할 때만 활성화
                                    }}
                                    onChangeText={(text) => setContentInput(text)}
                                    onBlur={() => {
                                        if (contentInput !== memo.content) {
                                            updateMemoContent('content', contentInput);
                                        }
                                        setIsEditing(false);
                                    }}
                                    placeholder="메모 내용을 입력하세요"
                                    multiline
                                />
                                <Text style={styles.timeAgo}>{getTimeAgo(memo.updatedAt)}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedMemo(memo);
                                        setShowOptions(true);
                                    }}
                                    style={styles.menuButton}
                                >
                                    <Ionicons name="ellipsis-vertical" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {showOptions && (
                            <Modal transparent={true} animationType="fade">
                                <Pressable onPress={() => setShowOptions(false)} style={styles.modalOverlay} />
                                <View style={styles.optionsMenu}>
                                    <Pressable onPress={() => setShowOptions(false)} style={styles.closeButton}>
                                        <Ionicons name="close" size={24} color="black" />
                                    </Pressable>
                                    <View style={styles.colorGrid}>
                                        <Pressable onPress={() => updateMemoColor('#FFFCED')} style={[styles.colorOption, { backgroundColor: '#FFFCED' }]} />
                                        <Pressable onPress={() => updateMemoColor('#CFFFD0')} style={[styles.colorOption, { backgroundColor: '#CFFFD0' }]} />
                                        <Pressable onPress={() => updateMemoColor('#FFD9C8')} style={[styles.colorOption, { backgroundColor: '#FFD9C8' }]} />
                                        <Pressable onPress={() => updateMemoColor('#D6CFFF')} style={[styles.colorOption, { backgroundColor: '#D6CFFF' }]} />
                                        <Pressable onPress={() => updateMemoColor('#E0F7FA')} style={[styles.colorOption, { backgroundColor: '#E0F7FA' }]} />
                                        <Pressable onPress={() => updateMemoColor('#FFF3E0')} style={[styles.colorOption, { backgroundColor: '#FFF3E0' }]} />
                                    </View>
                                    <Pressable style={styles.deleteOption} onPress={() => deleteMemo(selectedMemo.id)}>
                                        <Text style={{ color: 'red' }}>삭제</Text>
                                    </Pressable>
                                </View>
                            </Modal>
                        )}
                    </ScrollView>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    );
}
