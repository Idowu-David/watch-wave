'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useWatchlistStore'; 
import { Input } from '../../ui/input'; 
import { Button } from '../../ui/button'; 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../ui/card'; 
import { LogIn } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const login = useStore(state => state.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // --- FAKE LOGIN LOGIC ---
        // In a real app, this would be an API call to your backend.
        // For this project, we just check if the fields are non-empty.
        if (email.trim() === '' || password.trim() === '') {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }
        
        // Simulate a successful login after a short delay
        setTimeout(() => {
            // Call the Zustand store action to set the user
            login({ email: email });

            // Redirect the user to the dashboard
            router.push('../dashboard');
            
            setLoading(false);
        }, 800);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-950">
            <Card className="w-87.5 bg-neutral-900 border-neutral-800 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-red-600">
                        Log In
                    </CardTitle>
                    <p className="text-sm text-neutral-400">
                        Welcome back! Enter your credentials below.
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-neutral-800 border-neutral-700"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-neutral-800 border-neutral-700"
                                required
                            />
                        </div>
                        
                        {error && (
                            <p className="text-sm text-center text-red-500">{error}</p>
                        )}

                        <Button 
                            type="submit" 
                            className="w-full bg-red-600 hover:bg-red-700"
                            disabled={loading}
                        >
                            {loading ? (
                                'Logging in...'
                            ) : (
                                <><LogIn className="w-4 h-4 mr-2" /> Log In</>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center justify-center pt-0">
                    <p className="text-sm text-neutral-400">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-red-500 hover:text-red-400 font-medium">
                            Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}