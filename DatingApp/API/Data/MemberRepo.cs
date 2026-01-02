using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepo(AppDbContext context) : IMemberRepo
{
    public async Task<Member?> GetMemberForUpdate(string id)
    {
        return await context.Members
        .Include(x => x.User)
        .SingleOrDefaultAsync(m => m.Id == id);
    }

    async Task<Member?> IMemberRepo.GetMemberByIdAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    async Task<IReadOnlyList<Member>> IMemberRepo.GetMembersAsync()
    {
        return await context.Members.ToListAsync();
    }

    async Task<IReadOnlyList<Photo>> IMemberRepo.GetPhotosByMemberIdAsync(string memberId)
    {
        return await context.Members
            .Where(p => p.Id == memberId)
            .SelectMany(x => x.Photos)
            .ToListAsync();

    }

    async Task<bool> IMemberRepo.SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    void IMemberRepo.UpdateMember(Member member)
    {
        context.Entry(member).State = EntityState.Modified;
    }
}
