# Super simple debug script for Perl
use strict;
use warnings;

my $file = '/Users/magnuskroon/Documents/Tranberg Institut AB/assets/logo/master.svg';
open my $fh, '<', $file or die $!;
my $raw = do { local $/; <$fh> };
close $fh;

# Let's clean up XML tags to just get the d attribute content
if ($raw =~ /<path[^>]+?d\s*=\s*["']([^"']+)["']/s) {
    my $d = $1;
    print "Found path with length: " . length($d) . "\n";
    # Print first 200 chars
    print "Start: " . substr($d, 0, 200) . "\n";
    
    # Split by commands manually using split
    my @temp = split(/(?=[Mm])/, $d);
    print "Split count: " . scalar(@temp) . "\n";
    for my $i (0 .. $#temp) {
        my $trimmed = $temp[$i];
        $trimmed =~ s/^\s+|\s+$//g;
        print "Part $i: " . substr($trimmed, 0, 80) . "...\n" if $i < 15;
    }
} else {
    print "Not found with regex\n";
}
