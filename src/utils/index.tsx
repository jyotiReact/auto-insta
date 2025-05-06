/**
 * Formats a date string according to specified options
 * @param dateString - The date string to format (e.g., '2023-05-15')
 * @param options - Formatting options
 * @param options.locale - The locale to use (default: 'en-US')
 * @param options.format - Predefined format style ('short', 'medium', 'long', 'full') or custom format object
 * @returns Formatted date string
 */
export function formatDate(
    dateString: string,
    options: {
      locale?: string;
      format?: 'short' | 'medium' | 'long' | 'full' | Intl.DateTimeFormatOptions;
    } = {}
  ): string {
    const date = new Date(dateString);
    
    // Default formats
    const formatPresets = {
      short: { year: 'numeric', month: 'numeric', day: 'numeric' },
      medium: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
      full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' }
    };
  
    // Determine format options
    const formatOptions = typeof options.format === 'string' 
      ? formatPresets[options.format] 
      : options.format || formatPresets.medium;
  
    // Default to en-US if no locale provided
    const locale = options.locale || 'en-US';
  
    return date.toLocaleDateString(locale, formatOptions);
  }