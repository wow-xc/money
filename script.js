// Supabase 연결 설정 (본인의 정보를 넣으세요!)
const supabaseUrl = 'https://zfzavgfyplybbcexkvht.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmemF2Z2Z5cGx5YmJjZXhrdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDA2NzIsImV4cCI6MjA1NzUxNjY3Mn0.rUjucyUUnt3EGOq0ovclNhn-fTO2xX3xDSp2z0mND8o';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// 회원가입 함수
async function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        data: { username }
        }
    });

    if (error) alert('회원가입 실패: ' + error.message);
    else alert('회원가입 성공! 이메일을 확인해주세요.');
}

// 로그인 함수
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) alert('로그인 실패: ' + error.message);
    else alert('로그인 성공!');
}

// 내 프로필 가져오기 함수
async function getMyProfile() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        alert('먼저 로그인 해주세요.');
        return;
    }

    const { data, error } = await supabase.from('profiles')
    .select('username, cash, cache_content')
    .eq('id', user.id)
    .single();

    if (error) alert('정보 가져오기 실패: ' + error.message);
    else {
        document.getElementById('my-profile').innerText =
        `이름: ${data.username || '없음'}, 캐시: ${data.cash}, 캐시내용: ${data.cache_content || '없음'}`;
    }
}
