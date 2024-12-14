import React, { useState } from 'react';
import { Input } from './Input.jsx';
import { Button } from './Button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './Card.jsx';

const AISearch = () => {
    // State to manage search input and results
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // OpenAI API search function
    const performAISearch = async () => {
        // Reset previous state
        setSearchResults('');
        setError(null);
        setIsLoading(true);

        try {
            // Fetch call to OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` // Use environment variable
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that provides concise and informative responses."
                        },
                        {
                            role: "user",
                            content: searchQuery
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`OpenAI API request failed: ${errorBody}`);
            }

            const data = await response.json();

            // Extract the AI's response
            const aiResponse = data.choices[0].message.content;
            setSearchResults(aiResponse);
        } catch (err) {
            setError(err.message);
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            performAISearch();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>OpenAI-Powered Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-grow"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !searchQuery.trim()}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </Button>
                    </form>

                    {error && (
                        <div className="text-red-500 mb-4">
                            Error: {error}
                        </div>
                    )}

                    {isLoading && (
                        <div className="text-center text-gray-500">
                            Generating response... Please wait.
                        </div>
                    )}

                    {!isLoading && searchResults && (
                        <div className="mt-4 p-3 bg-gray-100 rounded">
                            <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
                            <p>{searchResults}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AISearch;
