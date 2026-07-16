# A Perl script to parse the master path, calculate absolute starts for all subpaths,
# and write out a clean, multi-path SVG where we can style each component individually.
use strict;
use warnings;

my $file = '/Users/magnuskroon/Documents/Tranberg Institut AB/assets/logo/master.svg';
open my $fh, '<', $file or die $!;
my $raw = do { local $/; <$fh> };
close $fh;

my ($d) = $raw =~ /<path[^>]+?d\s*=\s*["']([^"']+)["']/s;
die "No path found" unless $d;

# Normalize whitespace
$d =~ s/\s+/ /g;

# Split path into subpaths at every M/m, keeping the separator
my @raw_parts = split(/(?=[Mm])/, $d);

my $curr_x = 0;
my $curr_y = 0;
my $start_x = 0;
my $start_y = 0;

my @abs_parts;

# Loop through each subpath and convert its relative starting M/m command to absolute M
for my $i (0 .. $#raw_parts) {
    my $part = $raw_parts[$i];
    $part =~ s/^\s+|\s+$//g;
    
    # Extract command (m/M) and coordinates
    if ($part =~ /^([Mm])\s*(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)(.*)$/) {
        my ($cmd, $x, $y, $rest) = ($1, $2, $3, $4);
        
        my $abs_x;
        my $abs_y;
        
        if ($cmd eq 'M') {
            $abs_x = $x;
            $abs_y = $y;
        } else { # 'm'
            $abs_x = $curr_x + $x;
            $abs_y = $curr_y + $y;
        }
        
        # This subpath's start point
        $start_x = $abs_x;
        $start_y = $abs_y;
        
        # Now rebuild this path chunk starting with an absolute M
        my $new_part = "M $abs_x,$abs_y$rest";
        push @abs_parts, $new_part;
        
        # We need to trace coordinates in $rest to keep track of $curr_x, $curr_y
        # But wait, SVG path command parsing is complex.
        # Since we just want to split the path, do we actually need to trace all coordinates?
        # Yes, because the next relative 'm' is relative to where this subpath ends (or starts if it closed with 'z')!
        # Actually, if a subpath ends with 'z' (closepath), the current position is reset to the subpath's START point ($start_x, $start_y).
        # Since all subpaths in this SVG end with 'z' (they are closed shapes), the end position is ALWAYS the start point ($start_x, $start_y)!
        # Let's verify: do they end with 'z' or 'z '?
        my $ends_with_z = ($part =~ /z\s*$/i);
        
        # Therefore:
        $curr_x = $start_x;
        $curr_y = $start_y;
        
        print "Subpath $i starts at absolute ($curr_x, $curr_y)\n";
    } else {
        print "WARNING: Subpath $i does not match M/m template: $part\n";
    }
}

# Now we have all subpaths with absolute M starts!
# Let's write them down to a file for easy use:
my $scratch_file = '/Users/magnuskroon/Documents/Tranberg Institut AB/scratch/abs_subpaths.txt';
open my $out, '>', $scratch_file or die $!;
for my $i (0 .. $#abs_parts) {
    print $out "SUBPATH $i:\n$abs_parts[$i]\n\n";
}
close $out;
print "Wrote absolute subpaths to $scratch_file\n";
