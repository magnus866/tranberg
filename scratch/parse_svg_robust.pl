# A robust Perl script to parse master.svg, split subpaths, and save them for inspection
use strict;
use warnings;

my $file = '/Users/magnuskroon/Documents/Tranberg Institut AB/assets/logo/master.svg';
open my $fh, '<', $file or die "Can't open $file: $!";
my $content = do { local $/; <$fh> };
close $fh;

# Find the d="..." attribute (case-insensitive and multiline)
if ($content =~ /d\s*=\s*"([^"]+)"/si) {
    my $d_data = $1;
    # Normalize whitespaces
    $d_data =~ s/\s+/ /g;
    
    # Extract each command block starting with M or m
    my @subpaths;
    while ($d_data =~ /([Mm][^Mm]+)/g) {
        push @subpaths, $1;
    }
    
    print "Found " . scalar(@subpaths) . " subpaths in d attribute.\n";
    
    # Save a temporary HTML page to inspect them visually
    my $html = "<html><body><h2>Subpath Inspector</h2>";
    $html .= "<div style='display:grid; grid-template-columns: repeat(4, 1fr); gap: 20px;'>";
    
    for my $i (0 .. $#subpaths) {
        my $sp = $subpaths[$i];
        # Trim whitespace
        $sp =~ s/^\s+|\s+$//g;
        
        # Write individual SVG for check
        my $svg_filename = "/Users/magnuskroon/Documents/Tranberg Institut AB/scratch/sp_$i.svg";
        open my $out, '>', $svg_filename or die $!;
        print $out qq{<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 297" width="200" height="200" style="border:1px solid #ccc; background:#f0f0f0;">};
        # If it's a relative path, we might need to anchor it to (0,0) or some point if we render it alone
        # But we can try to render it relative to the starting point of the subpath
        print $out qq{<path fill="#26332B" stroke="#000" stroke-width="0.2" d="$sp"/>};
        print $out qq{</svg>};
        close $out;
        
        $html .= "<div><h4>Subpath $i</h4><img src='scratch/sp_$i.svg' width='150' height='150'/><pre style='font-size:10px; max-height:80px; overflow:auto;'>$sp</pre></div>";
    }
    
    $html .= "</div></body></html>";
    open my $html_out, '>', "/Users/magnuskroon/Documents/Tranberg Institut AB/scratch_inspect.html" or die $!;
    print $html_out $html;
    close $html_out;
    print "Wrote scratch_inspect.html and subpath SVGs.\n";
} else {
    print "ERROR: Could not find 'd' attribute in master.svg.\n";
}
