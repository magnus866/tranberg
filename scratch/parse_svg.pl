# Parse master.svg path and output each subpath separately
use strict;
use warnings;

my $content = do {
    local $/;
    open my $fh, '<', '/Users/magnuskroon/Documents/Tranberg Institut AB/assets/logo/master.svg' or die $!;
    <$fh>;
};

my ($d) = $content =~ /d="([^"]+)"/s;
die "No path found" unless $d;

# Normalize whitespace and commands
$d =~ s/\s+/ /g;

# Split on M or m commands (preserving them)
my @parts;
while ($d =~ /([Mm][^Mm]+)/g) {
    push @parts, $1;
}

print "Total subpaths: " . scalar(@parts) . "\n";
for my $i (0 .. $#parts) {
    my $part = $parts[$i];
    my $length = length($part);
    my $snippet = substr($part, 0, 80);
    print "Subpath $i (length $length): $snippet...\n";
}
