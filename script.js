// script.js

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('meta[http-equiv="Cache-Control"]').forEach(meta => {
        meta.content = 'no-cache, no-store, must-revalidate';
    });
    const supabaseUrl = "https://zfzavgfyplybbcexkvht.supabase.co"; // Supabase 프로젝트 URL
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmemF2Z2Z5cGx5YmJjZXhrdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDA2NzIsImV4cCI6MjA1NzUxNjY3Mn0.rUjucyUUnt3EGOq0ovclNhn-fTO2xX3xDSp2z0mND8o"; // Supabase API 키

    window.supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

    // 회원가입 함수
    window.signUp = async function () {
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const username = document.getElementById('signup-username').value;

        try {
            const { data, error } = await window.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { username }
                }
            });

            if (error) {
                console.error('회원가입 실패:', error.message);
                console.log('회원가입 실패: ' + error.message);
            } else {
                console.log('회원가입 성공! 로그인 페이지로 이동합니다.');
                window.location.href = '/signin.html'; // 로그인 페이지로 이동
            }
        } catch (err) {
            console.error('오류 발생:', err);
        }
    };

    // 로그인 함수
    window.login = async function () {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const { data, error } = await window.supabase.auth.signInWithPassword({ email, password });

            if (error) {
                console.error('로그인 실패:', error.message);
                console.log('로그인 실패: ' + error.message);
            } else {
                console.log('로그인 성공! 메인 페이지로 이동합니다.');
                window.location.href = '/index.html'; // 메인 페이지로 이동
            }
        } catch (err) {
            console.error('오류 발생:', err);
        }
    };
    // 로그아웃 함수
    window.logout = async function () {
        try {
            const { error } = await window.supabase.auth.signOut();
            if (error) {
                console.error('로그아웃 실패:', error.message);
                console.log('로그아웃 실패: ' + error.message);
            } else {
                console.log('로그아웃 성공! 로그인 페이지로 이동합니다.');
                window.location.href = '/signin.html'; // 로그인 페이지로 이동
            }
        } catch (err) {
            console.error('오류 발생:', err);
        }
    };

    // 출석체크 함수
    window.checkAttendance = async function () {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("로그인이 필요합니다.");
                return;
            }

            const today = new Date().toISOString().split("T")[0]; // 오늘 날짜 (YYYY-MM-DD 형식)

            // 사용자 정보 가져오기
            const { data: profileData, error: profileError } = await supabase
                .from("profiles")
                .select("date, balance")
                .eq("id", user.id)
                .single();

            if (profileError) {
                console.error("프로필 조회 실패:", profileError.message);
                alert("프로필 조회 실패: " + profileError.message);
                return;
            }

            // 이미 출석체크를 완료한 경우
            if (profileData.date === today) {
                document.getElementById("attendance-message").textContent = "오늘 이미 출석체크를 완료했습니다!";
                return;
            }

            // 출석체크 날짜와 잔액 업데이트
            const { error: updateError } = await supabase
                .from("profiles")
                .update({
                    date: today,
                    balance: profileData.balance + 500, // 기존 잔액에 500 추가
                })
                .eq("id", user.id);

            if (updateError) {
                console.error("출석체크 실패:", updateError.message);
                alert("출석체크 실패: " + updateError.message);
                return;
            }

            document.getElementById("attendance-message").textContent = "출석체크 완료! 500원이 지급되었습니다.";
        } catch (err) {
            console.error("오류 발생:", err);
            alert("오류 발생: " + err.message);
        }
    };




});
