// script.js

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('meta[http-equiv="Cache-Control"]').forEach(meta => {
        meta.content = 'no-cache, no-store, must-revalidate';
    });
    const supabaseUrl = 'https://zfzavgfyplybbcexkvht.supabase.co'; // Supabase 프로젝트 URL
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmemF2Z2Z5cGx5YmJjZXhrdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDA2NzIsImV4cCI6MjA1NzUxNjY3Mn0.rUjucyUUnt3EGOq0ovclNhn-fTO2xX3xDSp2z0mND8o'; // Supabase API 키

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
                alert('회원가입 실패: ' + error.message);
            } else {
                alert('회원가입 성공! 로그인 페이지로 이동합니다.');
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
                alert('로그인 실패: ' + error.message);
            } else {
                alert('로그인 성공! 메인 페이지로 이동합니다.');
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
                alert('로그아웃 실패: ' + error.message);
            } else {
                alert('로그아웃 성공! 로그인 페이지로 이동합니다.');
                window.location.href = '/signin.html'; // 로그인 페이지로 이동
            }
        } catch (err) {
            console.error('오류 발생:', err);
        }
    };

});
