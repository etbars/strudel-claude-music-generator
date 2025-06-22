# Overnight Fix Plan - Strudel + Claude Music Generator
*Generated at 1:59 AM - June 22, 2025*

## Current Critical Issues
1. **Sound Loading Failures** - Generated code references sounds that don't exist or load
2. **Syntax Errors** - Complex patterns, broken .when() calls, invalid chord notation
3. **Musical Quality** - Generated music is sparse, uninteresting, or doesn't play
4. **Pattern Complexity** - Overly complex note patterns that break Strudel's parser

## Root Cause Analysis
- **Claude Prompt Issues**: Still generating invalid syntax despite restrictions
- **Sound Library Mismatch**: Using sounds not confirmed to work in web Strudel
- **Pattern Generation**: Creating patterns too complex for reliable parsing
- **Post-Processing Gaps**: Not catching all syntax errors before output

## Systematic Fix Strategy

### Phase 1: Sound Library Audit (HIGH PRIORITY)
- [ ] Test each sound in the "confirmed working" list in actual Strudel REPL
- [ ] Remove any sounds that fail to load
- [ ] Create minimal working examples for each confirmed sound
- [ ] Update Claude prompts with only verified sounds

### Phase 2: Syntax Simplification (HIGH PRIORITY)  
- [ ] Simplify note pattern generation - avoid nested brackets
- [ ] Fix .when() and .every() function calls
- [ ] Remove complex chord notation (maj7, min7, etc.)
- [ ] Ensure all generated patterns are parseable

### Phase 3: Musical Quality Improvement (MEDIUM PRIORITY)
- [ ] Create template-based generation for reliable patterns
- [ ] Focus on simple but effective compositions
- [ ] Ensure proper gain staging and mixing
- [ ] Test generated music for actual playback

### Phase 4: Testing & Validation (MEDIUM PRIORITY)
- [ ] Create automated testing for generated code
- [ ] Build library of working examples
- [ ] Validate each genre template works
- [ ] Document known working patterns

## Specific Actions for Tonight

### 1. Sound Library Verification
- Test core sounds: bd, sd, hh, piano, sine, sawtooth, square
- Remove problematic GM sounds and samples
- Update sound lists in all prompt files

### 2. Pattern Simplification  
- Rewrite note pattern generation to use simple sequences
- Remove complex nested bracket patterns
- Focus on basic but musical patterns

### 3. Function Call Fixes
- Fix .when() and .every() syntax in prompts
- Add better post-processing for function calls
- Remove problematic modulation that breaks parsing

### 4. Create Working Templates
- Build 3-5 simple but effective templates
- Test each template manually in Strudel REPL
- Use as basis for generation logic

## Success Metrics
- [ ] Generated code plays without errors
- [ ] All referenced sounds load successfully  
- [ ] Music is engaging and musical
- [ ] Code is copy-pastable without manual fixes

## Files to Review/Modify
1. `backend/claude.js` - Core prompt and post-processing
2. `backend/claude_enhanced.js` - Enhanced generation logic
3. `backend/sounds.js` - Sound library definitions
4. `backend/patterns.js` - Pattern templates
5. Test generation with multiple prompts

## Conservative Approach
- Only make changes I'm 100% confident will improve things
- Test each change against actual Strudel REPL when possible
- Focus on getting basic functionality working before advanced features
- Document all changes for morning review

---
*This plan prioritizes getting the system working reliably over advanced features. The goal is functional, musical output that actually plays in Strudel.*
