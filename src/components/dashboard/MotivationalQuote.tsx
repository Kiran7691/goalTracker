import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Quote as QuoteIcon } from 'lucide-react';
import { getRandomQuote } from '../../lib/api/quotes';

export default function MotivationalQuote() {
  const { data: quote, isLoading, isError } = useQuery({
    queryKey: ['quote'],
    queryFn: getRandomQuote,
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
  });

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="flex flex-row items-center space-x-2">
        <QuoteIcon className="h-4 w-4 text-primary" />
        <CardTitle className="text-xl font-semibold">Daily Inspiration</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Failed to load motivational quote. Please try again later.
          </p>
        ) : (
          <blockquote className="space-y-3 py-4">
            <p className="text-lg leading-relaxed text-foreground italic">
              "{quote.content}"
            </p>
            <footer className="text-sm font-medium text-muted-foreground">
              — {quote.author}
            </footer>
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}