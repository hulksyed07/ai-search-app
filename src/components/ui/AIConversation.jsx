import React, { useState } from 'react';
import { Input } from './Input.jsx';
import { Button } from './Button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './Card.jsx';

const AIConversation = () => {
    // State to manage search input and results
    const [messages, setMessages] = useState([
        {
            role: "system",
            content: "You are a helpful assistant that provides concise and informative responses."
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // OpenAI API search function
    const performAISearch = async () => {
        const updatedMessages = [...messages, { role: "user", content: searchQuery }];
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
                    'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}` // Use environment variable
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: updatedMessages,
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

            // Update the conversation history with the AI's response
            setMessages([...updatedMessages, { role: "assistant", content: aiResponse }]);
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

                <div style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "20px",
                    maxHeight: "400px",
                    overflowY: "auto"
                }}>
                    {messages
                        .filter(message => message.role !== "system") // Hide system messages from the UI
                        .map((message, index) => (
                            <div key={index} style={{marginBottom: "10px"}}>
                                <strong style={{color: message.role === "user" ? "blue" : "green"}}>
                                    {message.role === "user" ? "You" : "AI"}:
                                </strong>
                                <span style={{marginLeft: "5px"}}>{message.content}</span>
                            </div>
                        ))}
                </div>

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
                </CardContent>
            </Card>
        </div>
    );
};

export default AIConversation;
